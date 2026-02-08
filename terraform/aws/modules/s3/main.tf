resource "aws_s3_bucket" "terrastationvn" {
  bucket = "terrastationvn"
  force_destroy = true
  tags = {
    Name = "terrastationvn"
  }
}

resource "aws_s3_bucket" "arknights_vns" {
  bucket = "arknights-vns"
  force_destroy = true
  tags = {
    Name = "arknights-vns"
  }
}

resource "aws_s3_bucket_public_access_block" "terrastationvn" {
  bucket = aws_s3_bucket.terrastationvn.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_public_access_block" "arknights_vns" {
  bucket = aws_s3_bucket.arknights_vns.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "terrastationvn" {
  bucket = aws_s3_bucket.terrastationvn.id
  policy = data.aws_iam_policy_document.terrastationvn.json
}

resource "aws_s3_bucket_policy" "arknights_vns" {
  bucket = aws_s3_bucket.arknights_vns.id
  policy = data.aws_iam_policy_document.arknights_vns.json
}

data "aws_iam_policy_document" "terrastationvn" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.terrastationvn.arn}/*"]
    principals {
      type        = "AWS"
      identifiers = [var.cloudfront_oai_iam_arn_terrastationvn]
    }
    effect = "Allow"
  }
}

data "aws_iam_policy_document" "arknights_vns" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.arknights_vns.arn}/*"]
    principals {
      type        = "AWS"
      identifiers = [var.cloudfront_oai_iam_arn_arknights_vns]
    }
    effect = "Allow"
  }
}
