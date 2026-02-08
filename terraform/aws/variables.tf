variable "rds_username" {
  description = "RDS master username"
  type        = string
}

variable "rds_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "Root domain name for Route 53 hosted zone"
  type        = string
}

variable "terrastationvn_subdomain" {
  description = "Subdomain for terrastationvn bucket"
  type        = string
  default     = "terrastation"
}

variable "arknights_vns_subdomain" {
  description = "Subdomain for arknights-vns bucket"
  type        = string
  default     = "assets"
}

variable "ssh_public_key" {
  description = "SSH public key for EC2 instance access"
  type        = string
}
