variable "ec2_key_name" {
    description = "Nombre del key pair para EC2"
    type        = string
    default     = "claves-imporcomgua"
}

variable "github_token" {
    description = "Token personal de GitHub"
    type        = string
    sensitive   = true
}

variable "db_host" {
    type        = string
    description = "Endpoint del RDS"
    sensitive   = true
}

variable "db_user" {
    type        = string
    description = "Usuario de la base de datos"
    sensitive   = true
}

variable "db_password" {
    type        = string
    description = "Contraseña de la base de datos"
    sensitive   = true
}

variable "db_name" {
    type        = string
    description = "Nombre de la base de datos"
    sensitive   = true
}