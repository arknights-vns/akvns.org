output "cluster_id" {
  description = "ECS cluster ID"
  value       = module.ecs.cluster_id
}

output "cluster_arn" {
  description = "ECS cluster ARN"
  value       = module.ecs.cluster_arn
}

output "cluster_name" {
  description = "ECS cluster name"
  value       = module.ecs.cluster_name
}

output "service_id" {
  description = "ECS service ID"
  value       = module.ecs.services[var.name].id
}

output "service_name" {
  description = "ECS service name"
  value       = module.ecs.services[var.name].name
}

output "task_definition_arn" {
  description = "Task definition ARN"
  value       = module.ecs.services[var.name].task_definition_arn
}

output "security_group_id" {
  description = "ECS security group ID"
  value       = aws_security_group.ecs.id
}

output "log_group_name" {
  description = "CloudWatch log group name"
  value       = aws_cloudwatch_log_group.ecs.name
}
