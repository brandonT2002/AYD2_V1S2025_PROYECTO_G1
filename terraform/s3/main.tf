resource "aws_s3_bucket" "imporcomgua" {
    bucket = "imporcomgua"

    tags = {
        Name        = "imporcomgua"
        Environment = "Dev"
    }
}

resource "aws_s3_bucket_versioning" "imporcomgua_versioning" {
    bucket = aws_s3_bucket.imporcomgua.id

    versioning_configuration {
        status = "Suspended"
    }
}

resource "aws_s3_bucket_public_access_block" "imporcomgua_public_access_block" {
    bucket = aws_s3_bucket.imporcomgua.id

    block_public_acls       = false
    block_public_policy     = false
    ignore_public_acls      = false
    restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "website_config" {
    bucket = aws_s3_bucket.imporcomgua.id

    index_document {
        suffix = "index.html"
    }

    error_document {
        key = "error.html"
    }
}

resource "aws_s3_bucket_policy" "website_policy" {
    bucket = aws_s3_bucket.imporcomgua.id

    depends_on = [aws_s3_bucket_public_access_block.imporcomgua_public_access_block]

    policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Sid       = "PublicReadGetObject",
                Effect    = "Allow",
                Principal = "*",
                Action    = ["s3:GetObject"],
                Resource  = ["${aws_s3_bucket.imporcomgua.arn}/*"]
            }
        ]
    })
}
