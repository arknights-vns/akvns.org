output "db_instance_id" {
  description = "RDS instance ID"
  value       = module.rds.db_instance_identifier
}

output "db_instance_arn" {
  description = "RDS instance ARN"
  value       = module.rds.db_instance_arn
}

output "db_instance_endpoint" {
  description = "RDS instance endpoint"
  value       = module.rds.db_instance_endpoint
}

output "db_instance_port" {
  description = "RDS instance port"
  value       = module.rds.db_instance_port
}

output "db_instance_name" {
  description = "Database name"
  value       = module.rds.db_instance_name
}

output "db_instance_username" {
  description = "Master username"
  value       = module.rds.db_instance_username
  sensitive   = true
}

output "db_security_group_id" {
  description = "Security group ID"
  value       = aws_security_group.rds.id
}

output "db_subnet_group_name" {
  description = "Subnet group name"
  value       = aws_db_subnet_group.this.name
}

output "db_credentials_secret_arn" {
  description = "Secrets Manager secret ARN for database credentials"
  value       = aws_secretsmanager_secret.db_credentials.arn
}

output "db_credentials_secret_name" {
  description = "Secrets Manager secret name for database credentials"
  value       = aws_secretsmanager_secret.db_credentials.name
}
