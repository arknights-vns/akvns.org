output "terrastationvn_bucket_domain_name" {
  value = aws_s3_bucket.terrastationvn.bucket_regional_domain_name
}

output "arknights_vns_bucket_domain_name" {
  value = aws_s3_bucket.arknights_vns.bucket_regional_domain_name
}

output "terrastationvn_bucket_id" {
  value = aws_s3_bucket.terrastationvn.id
}

output "arknights_vns_bucket_id" {
  value = aws_s3_bucket.arknights_vns.id
}
