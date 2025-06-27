provider "aws" {
    region = "us-east-1"
}

data "aws_security_group" "rds_existing" {
    id = "sg-019fdb7f717ebdf1a"
}

locals {
    user_data_script = templatefile("${path.module}/user_data.sh.tpl", {
        github_token = var.github_token
        db_host      = var.db_host
        db_user      = var.db_user
        db_password  = var.db_password
        db_name      = var.db_name
    })
}

resource "aws_instance" "app_server" {
    ami                    = "ami-0a7d80731ae1b2435"
    instance_type          = "t2.micro"
    key_name               = var.ec2_key_name
    vpc_security_group_ids = [data.aws_security_group.rds_existing.id]
    user_data              = local.user_data_script

    tags = {
        Name = "ec2-imporcomgua"
    }
}