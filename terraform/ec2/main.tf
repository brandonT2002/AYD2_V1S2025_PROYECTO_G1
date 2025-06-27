provider "aws" {
    region = "us-east-1"
}

resource "aws_s3_bucket" "static_site" {
    bucket        = var.bucket_name
    force_destroy = true

    website {
        index_document = "index.html"
        error_document = "index.html" # útil para React SPA
    }

    tags = {
        Name        = var.bucket_name
        Environment = "StaticWebsite"
    }
}

resource "aws_s3_bucket_public_access_block" "allow_public" {
    bucket = aws_s3_bucket.static_site.id

    block_public_acls       = false
    block_public_policy     = false
    ignore_public_acls      = false
    restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "public_read" {
    bucket = aws_s3_bucket.static_site.id

    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Sid       = "PublicReadGetObject"
            Effect    = "Allow"
            Principal = "*"
            Action    = "s3:GetObject"
            Resource  = "${aws_s3_bucket.static_site.arn}/*"
        }]
    })
}
