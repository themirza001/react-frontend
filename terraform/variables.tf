variable "project_name" {
  description = "Project name"
  type        = string
  default     = "react-frontend"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "tags" {
  description = "Common resource tags"
  type        = map(string)
  default = {
    Project     = "ReactFrontend"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}
