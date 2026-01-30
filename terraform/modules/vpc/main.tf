data "aws_availability_zones" "available" {
  state = "available"
}

locals {
  azs = slice(data.aws_availability_zones.available.names, 0, 3)

  private_subnets = [
    cidrsubnet(var.cidr, 4, 0),
    cidrsubnet(var.cidr, 4, 1),
    cidrsubnet(var.cidr, 4, 2)
  ]

  public_subnets = [
    cidrsubnet(var.cidr, 4, 8),
    cidrsubnet(var.cidr, 4, 9),
    cidrsubnet(var.cidr, 4, 10)
  ]
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.18.1"

  name = "${var.project_name}-${var.name}-${var.environment}"
  cidr = var.cidr

  azs             = local.azs
  private_subnets = local.private_subnets
  public_subnets  = local.public_subnets

  enable_nat_gateway     = var.enable_nat_gateway
  single_nat_gateway     = var.single_nat_gateway
  one_nat_gateway_per_az = var.environment == "production" && var.enable_nat_gateway
  enable_vpn_gateway     = var.enable_vpn_gateway

  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.project_name}-${var.name}-${var.environment}"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
    Generator   = "React2AWS"
  }
}

module "vpc_endpoints" {
  source  = "terraform-aws-modules/vpc/aws//modules/vpc-endpoints"
  version = "5.18.1"

  vpc_id = module.vpc.vpc_id

  endpoints = {
    s3 = {
      service         = "s3"
      service_type    = "Gateway"
      route_table_ids = module.vpc.private_route_table_ids
      tags            = { Name = "${var.project_name}-${var.name}-s3-endpoint" }
    }
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}
