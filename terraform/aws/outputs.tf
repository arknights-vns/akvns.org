output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

output "rds_endpoint" {
  description = "The connection endpoint for the RDS instance"
  value       = module.rds.db_instance_endpoint
}

output "terrastationvn_custom_domain" {
  description = "Custom domain for terrastationvn"
  value       = "${var.terrastationvn_subdomain}.${var.domain_name}"
}

output "arknights_vns_custom_domain" {
  description = "Custom domain for arknights-vns"
  value       = "${var.arknights_vns_subdomain}.${var.domain_name}"
}

output "route53_nameservers" {
  description = "Route 53 nameservers - Update these at your domain registrar"
  value       = aws_route53_zone.main.name_servers
}

output "terrastationvn_cloudfront_domain" {
  description = "CloudFront distribution domain for terrastationvn"
  value       = aws_cloudfront_distribution.terrastationvn.domain_name
}

output "arknights_vns_cloudfront_domain" {
  description = "CloudFront distribution domain for arknights-vns"
  value       = aws_cloudfront_distribution.arknights_vns.domain_name
}

output "terrastationvn_bucket_id" {
  description = "S3 bucket ID for terrastationvn"
  value       = module.s3.terrastationvn_bucket_id
}

output "arknights_vns_bucket_id" {
  description = "S3 bucket ID for arknights-vns"
  value       = module.s3.arknights_vns_bucket_id
}

output "ec2_public_ip" {
  description = "EC2 instance public IP for web server"
  value       = module.ec2.instance_public_ip
}

output "web_domain" {
  description = "Web server domain (apex and www)"
  value       = "https://${var.domain_name} and https://www.${var.domain_name}"
}
