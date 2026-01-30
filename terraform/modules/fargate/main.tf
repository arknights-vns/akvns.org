locals {
  service_name = "${var.project_name}-${var.name}-${var.environment}"
}

resource "aws_security_group" "ecs" {
  name        = "${local.service_name}-ecs-sg"
  description = "Security group for ${local.service_name} ECS tasks"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Allow traffic from ALB"
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = var.alb_security_group_id != null ? [var.alb_security_group_id] : []
    cidr_blocks     = var.alb_security_group_id == null ? ["0.0.0.0/0"] : []
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${local.service_name}-ecs-sg"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/${local.service_name}"
  retention_in_days = var.log_retention_days

  tags = {
    Name        = "${local.service_name}-logs"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

module "ecs" {
  source  = "terraform-aws-modules/ecs/aws"
  version = "5.11.4"

  cluster_name = local.service_name

  cluster_settings = {
    name  = "containerInsights"
    value = var.environment == "production" ? "enabled" : "disabled"
  }

  fargate_capacity_providers = {
    FARGATE = {
      default_capacity_provider_strategy = {
        weight = 100
        base   = 1
      }
    }
    FARGATE_SPOT = {
      default_capacity_provider_strategy = {
        weight = 0
      }
    }
  }

  services = {
    (var.name) = {
      cpu    = var.cpu
      memory = var.memory

      enable_execute_command = true

      container_definitions = {
        (var.name) = {
          cpu       = var.cpu
          memory    = var.memory
          essential = true
          image     = var.container_image
          port_mappings = [
            {
              name          = var.name
              containerPort = var.container_port
              hostPort      = var.container_port
              protocol      = "tcp"
            }
          ]

          environment = [
            for k, v in var.environment_variables : {
              name  = k
              value = v
            }
          ]

          secrets = [
            for k, v in var.secrets : {
              name      = k
              valueFrom = v
            }
          ]

          log_configuration = {
            logDriver = "awslogs"
            options = {
              awslogs-group         = aws_cloudwatch_log_group.ecs.name
              awslogs-region        = var.aws_region
              awslogs-stream-prefix = "ecs"
            }
          }

          readonly_root_filesystem = false

          health_check = var.health_check_path != null ? {
            command     = ["CMD-SHELL", "curl -f http://localhost:${var.container_port}${var.health_check_path} || exit 1"]
            interval    = 30
            timeout     = 5
            retries     = 3
            startPeriod = 60
          } : null
        }
      }

      desired_count = var.desired_count

      load_balancer = var.target_group_arn != null ? {
        service = {
          target_group_arn = var.target_group_arn
          container_name   = var.name
          container_port   = var.container_port
        }
      } : {}

      subnet_ids = var.subnet_ids
      security_group_ids = [aws_security_group.ecs.id]

      assign_public_ip = false
    }
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
    Generator   = "React2AWS"
  }
}

resource "aws_appautoscaling_target" "ecs" {
  count              = var.enable_autoscaling ? 1 : 0
  max_capacity       = var.autoscaling_max_capacity
  min_capacity       = var.desired_count
  resource_id        = "service/${module.ecs.cluster_name}/${var.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"

  depends_on = [module.ecs]
}

resource "aws_appautoscaling_policy" "cpu" {
  count              = var.enable_autoscaling ? 1 : 0
  name               = "${local.service_name}-cpu-autoscaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs[0].resource_id
  scalable_dimension = aws_appautoscaling_target.ecs[0].scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs[0].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = var.autoscaling_cpu_target
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}

resource "aws_appautoscaling_policy" "memory" {
  count              = var.enable_autoscaling ? 1 : 0
  name               = "${local.service_name}-memory-autoscaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs[0].resource_id
  scalable_dimension = aws_appautoscaling_target.ecs[0].scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs[0].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value       = var.autoscaling_memory_target
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}
