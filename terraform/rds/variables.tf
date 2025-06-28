variable "db_user" {
    description = "Usuario de la base de datos"
    type        = string
}

variable "db_password" {
    description = "Contraseña de la base de datos"
    type        = string
    sensitive   = true
}
