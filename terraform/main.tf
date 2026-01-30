terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "Terraform"
      Generator   = "Rice Shower"
    }
  }
}

provider "random" {}

locals {
  is_production = var.environment == "production"
}

module "vpc_vpc" {
  source = "./modules/vpc"

  name         = "vpc"
  environment  = var.environment
  project_name = var.project_name
  cidr         = var.vpc_cidr

  enable_nat_gateway = true
  single_nat_gateway = local.is_production ? false : false
}

module "fargate_website_host" {
  source = "./modules/fargate"

  name         = "website-host"
  environment  = var.environment
  project_name = var.project_name
  aws_region   = var.aws_region

  vpc_id     = module.vpc_vpc.vpc_id
  subnet_ids = module.vpc_vpc.private_subnet_ids

  container_image = var.website_host_container_image
  container_port  = 3000

  cpu    = 512
  memory = 512

  desired_count            = 1
  enable_autoscaling       = local.is_production
  autoscaling_max_capacity = local.is_production ? 5 : 1
}

module "rds_website_db" {
  source = "./modules/rds"

  name         = "website-db"
  environment  = var.environment
  project_name = var.project_name

  vpc_id     = module.vpc_vpc.vpc_id
  subnet_ids = module.vpc_vpc.private_subnet_ids

  engine         = "postgres"
  instance_class = local.is_production ? "db.t4g.small" : "db.t4g.micro"

  allocated_storage     = 20
  max_allocated_storage = 100

  multi_az                = local.is_production || false
  backup_retention_period = local.is_production ? 7 : 7
  deletion_protection     = local.is_production

  monitoring_interval          = local.is_production ? 60 : 0
  performance_insights_enabled = local.is_production

  allowed_cidr_blocks = [module.vpc_vpc.vpc_cidr_block]
}

module "s3_website_artifact" {
  source = "./modules/s3"

  name         = "website-artifact"
  environment  = var.environment
  project_name = var.project_name

  versioning = true
}

module "s3_terrastationvn" {
  source = "./modules/s3"

  name         = "terrastationvn"
  environment  = var.environment
  project_name = var.project_name

  versioning = false
}

module "s3_assets" {
  source = "./modules/s3"

  name         = "assets"
  environment  = var.environment
  project_name = var.project_name

  versioning = false
}
