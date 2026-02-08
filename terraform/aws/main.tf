terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "aws" {
  region = "ap-southeast-1"
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

module "vpc" {
  source = "./modules/vpc"
}

module "ec2" {
  source = "./modules/ec2"
  vpc_id = module.vpc.vpc_id
  subnet_id = module.vpc.public_subnet_ids[0]
  ssh_public_key = var.ssh_public_key
}

module "rds" {
  source              = "./modules/rds"
  subnet_ids          = module.vpc.public_subnet_ids
  security_group_ids  = [module.ec2.security_group_id]
  rds_username        = var.rds_username
  rds_password        = var.rds_password
}

resource "aws_cloudfront_origin_access_identity" "terrastationvn" {
  comment = "OAI for terrastationvn S3 bucket"
}

resource "aws_cloudfront_origin_access_identity" "arknights_vns" {
  comment = "OAI for arknights-vns S3 bucket"
}

module "s3" {
  source                                = "./modules/s3"
  cloudfront_oai_iam_arn_terrastationvn = aws_cloudfront_origin_access_identity.terrastationvn.iam_arn
  cloudfront_oai_iam_arn_arknights_vns  = aws_cloudfront_origin_access_identity.arknights_vns.iam_arn
}

resource "aws_route53_zone" "main" {
  name = var.domain_name
}

resource "aws_acm_certificate" "web" {
  provider          = aws.us_east_1
  domain_name       = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "web-cert"
  }
}

resource "aws_acm_certificate" "terrastationvn" {
  provider          = aws.us_east_1
  domain_name       = "${var.terrastationvn_subdomain}.${var.domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "terrastationvn-cert"
  }
}

resource "aws_acm_certificate" "arknights_vns" {
  provider          = aws.us_east_1
  domain_name       = "${var.arknights_vns_subdomain}.${var.domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "arknights-vns-cert"
  }
}

resource "aws_route53_record" "web_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.web.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.main.zone_id
}

resource "aws_route53_record" "terrastationvn_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.terrastationvn.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.main.zone_id
}

resource "aws_route53_record" "arknights_vns_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.arknights_vns.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.main.zone_id
}

resource "aws_acm_certificate_validation" "web" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.web.arn
  validation_record_fqdns = [for record in aws_route53_record.web_cert_validation : record.fqdn]
}

resource "aws_acm_certificate_validation" "terrastationvn" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.terrastationvn.arn
  validation_record_fqdns = [for record in aws_route53_record.terrastationvn_cert_validation : record.fqdn]
}

resource "aws_acm_certificate_validation" "arknights_vns" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.arknights_vns.arn
  validation_record_fqdns = [for record in aws_route53_record.arknights_vns_cert_validation : record.fqdn]
}

resource "aws_cloudfront_distribution" "terrastationvn" {
  origin {
    domain_name = module.s3.terrastationvn_bucket_domain_name
    origin_id   = "s3-terrastationvn"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.terrastationvn.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  aliases             = ["${var.terrastationvn_subdomain}.${var.domain_name}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-terrastationvn"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    default_ttl = 31536000
    max_ttl     = 31536000
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.terrastationvn.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name = "terrastationvn-cloudfront"
  }

  depends_on = [aws_acm_certificate_validation.terrastationvn]
}

resource "aws_route53_record" "terrastationvn" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "${var.terrastationvn_subdomain}.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.terrastationvn.domain_name
    zone_id                = aws_cloudfront_distribution.terrastationvn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "terrastationvn_ipv6" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "${var.terrastationvn_subdomain}.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.terrastationvn.domain_name
    zone_id                = aws_cloudfront_distribution.terrastationvn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_cloudfront_distribution" "arknights_vns" {
  origin {
    domain_name = module.s3.arknights_vns_bucket_domain_name
    origin_id   = "s3-arknights-vns"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.arknights_vns.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = ["${var.arknights_vns_subdomain}.${var.domain_name}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-arknights-vns"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    default_ttl = 31536000
    max_ttl     = 31536000
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.arknights_vns.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name = "arknights-vns-cloudfront"
  }

  depends_on = [aws_acm_certificate_validation.arknights_vns]
}

resource "aws_route53_record" "arknights_vns" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "${var.arknights_vns_subdomain}.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.arknights_vns.domain_name
    zone_id                = aws_cloudfront_distribution.arknights_vns.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "arknights_vns_ipv6" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "${var.arknights_vns_subdomain}.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.arknights_vns.domain_name
    zone_id                = aws_cloudfront_distribution.arknights_vns.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "apex" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"
  ttl     = 300
  records = [module.ec2.instance_public_ip]
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"
  ttl     = 300
  records = [module.ec2.instance_public_ip]
}
