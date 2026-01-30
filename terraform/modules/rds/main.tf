locals {
  identifier = "${var.project_name}-${var.name}-${var.environment}"
}

resource "random_password" "master" {
  length  = 32
  special = false
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name        = "${local.identifier}-credentials"
  description = "Database credentials for ${local.identifier}"

  tags = {
    Name        = "${local.identifier}-credentials"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

resource "aws_secretsmanager_secret_version" "db_credentials" {
  secret_id = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    username = var.master_username
    password = random_password.master.result
    engine   = var.engine
    host     = module.rds.db_instance_endpoint
    port     = module.rds.db_instance_port
    dbname   = var.database_name
  })
}

resource "aws_security_group" "rds" {
  name        = "${local.identifier}-sg"
  description = "Security group for ${local.identifier} RDS"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Database access"
    from_port       = var.engine == "postgres" ? 5432 : 3306
    to_port         = var.engine == "postgres" ? 5432 : 3306
    protocol        = "tcp"
    cidr_blocks     = var.allowed_cidr_blocks
    security_groups = var.allowed_security_group_ids
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${local.identifier}-sg"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

resource "aws_db_subnet_group" "this" {
  name        = "${local.identifier}-subnet-group"
  description = "Subnet group for ${local.identifier}"
  subnet_ids  = var.subnet_ids

  tags = {
    Name        = "${local.identifier}-subnet-group"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

resource "aws_iam_role" "rds_monitoring" {
  count = var.monitoring_interval > 0 ? 1 : 0
  name  = "${local.identifier}-monitoring-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "monitoring.rds.amazonaws.com"
      }
    }]
  })

  tags = {
    Name        = "${local.identifier}-monitoring-role"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

resource "aws_iam_role_policy_attachment" "rds_monitoring" {
  count      = var.monitoring_interval > 0 ? 1 : 0
  role       = aws_iam_role.rds_monitoring[0].name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}

module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "6.10.0"

  identifier = local.identifier

  engine               = var.engine
  engine_version       = var.engine_version
  family               = var.family
  major_engine_version = var.major_engine_version
  instance_class       = var.instance_class

  allocated_storage     = var.allocated_storage
  max_allocated_storage = var.max_allocated_storage
  storage_encrypted     = true
  storage_type          = var.storage_type

  db_name  = var.database_name
  username = var.master_username
  password = random_password.master.result
  port     = var.engine == "postgres" ? 5432 : 3306

  multi_az               = var.environment == "production" || var.multi_az
  db_subnet_group_name   = aws_db_subnet_group.this.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  maintenance_window          = var.maintenance_window
  backup_window               = var.backup_window
  backup_retention_period     = var.environment == "production" ? max(var.backup_retention_period, 7) : var.backup_retention_period
  skip_final_snapshot         = var.environment != "production"
  deletion_protection         = var.environment == "production" || var.deletion_protection
  apply_immediately           = var.environment != "production"

  performance_insights_enabled          = var.environment == "production" || var.performance_insights_enabled
  performance_insights_retention_period = var.environment == "production" ? 7 : 0

  monitoring_interval = var.monitoring_interval
  monitoring_role_arn = var.monitoring_interval > 0 ? aws_iam_role.rds_monitoring[0].arn : null

  enabled_cloudwatch_logs_exports = var.enabled_cloudwatch_logs_exports
  create_cloudwatch_log_group     = true

  tags = {
    Name        = local.identifier
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
    Generator   = "React2AWS"
  }
}
