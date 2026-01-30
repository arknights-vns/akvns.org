output "vpc_vpc_id" {
  description = "VPC ID for vpc"
  value       = module.vpc_vpc.vpc_id
}

output "vpc_vpc_private_subnets" {
  description = "Private subnet IDs for vpc"
  value       = module.vpc_vpc.private_subnet_ids
}

output "fargate_website_host_cluster" {
  description = "ECS cluster name for website-host"
  value       = module.fargate_website_host.cluster_name
}

output "fargate_website_host_service" {
  description = "ECS service name for website-host"
  value       = module.fargate_website_host.service_name
}

output "rds_website_db_endpoint" {
  description = "RDS endpoint for website-db"
  value       = module.rds_website_db.db_instance_endpoint
}

output "rds_website_db_secret_arn" {
  description = "RDS credentials secret ARN for website-db"
  value       = module.rds_website_db.db_credentials_secret_arn
}

output "s3_website_artifact_bucket" {
  description = "S3 bucket name for website-artifact"
  value       = module.s3_website_artifact.bucket_name
}

output "s3_website_artifact_arn" {
  description = "S3 bucket ARN for website-artifact"
  value       = module.s3_website_artifact.bucket_arn
}

output "s3_terrastationvn_bucket" {
  description = "S3 bucket name for terrastationvn"
  value       = module.s3_terrastationvn.bucket_name
}

output "s3_terrastationvn_arn" {
  description = "S3 bucket ARN for terrastationvn"
  value       = module.s3_terrastationvn.bucket_arn
}

output "s3_assets_bucket" {
  description = "S3 bucket name for assets"
  value       = module.s3_assets.bucket_name
}

output "s3_assets_arn" {
  description = "S3 bucket ARN for assets"
  value       = module.s3_assets.bucket_arn
}
