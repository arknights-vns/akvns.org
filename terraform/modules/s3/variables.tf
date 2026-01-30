variable "name" {
  description = "Name identifier for this S3 bucket"
  type        = string
}

variable "environment" {
  description = "Environment name (development, staging, production)"
  type        = string
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "versioning" {
  description = "Enable versioning"
  type        = bool
  default     = true
}

variable "kms_key_arn" {
  description = "KMS key ARN for encryption (uses AES256 if not set)"
  type        = string
  default     = null
}

variable "lifecycle_rules" {
  description = "Lifecycle rules for the bucket"
  type = list(object({
    id                         = string
    expiration_days            = optional(number)
    transition_days            = optional(number)
    transition_storage_class   = optional(string, "STANDARD_IA")
    noncurrent_expiration_days = optional(number)
  }))
  default = null
}
