terraform {
    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = "~> 5.0"
        }
    }
    required_version = ">= 1.3"
}

provider "aws" {
    region = "us-east-1"
}

data "aws_security_group" "rds_existing" {
    id = "sg-019fdb7f717ebdf1a"
}

resource "aws_db_instance" "default" {
    identifier               = "rds-imporcomgua-ayd2"
    allocated_storage        = 20
    storage_type             = "gp2"
    engine                   = "mysql"
    engine_version           = "8.0"
    instance_class           = "db.t3.micro"
    username                 = var.db_user
    password                 = var.db_password
    parameter_group_name     = "default.mysql8.0"
    skip_final_snapshot      = true
    publicly_accessible      = true
    deletion_protection      = false
    backup_retention_period  = 0
    vpc_security_group_ids   = [data.aws_security_group.rds_existing.id]

    tags = {
        Name = "rds-imporcomgua"
    }
}