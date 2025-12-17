data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions = ["s3:GetObject"]
    resources = [
      "${aws_s3_bucket.react_bucket.arn}/*"
    ]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cdn.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.react_bucket.id
  policy = data.aws_iam_policy_document.s3_policy.json
}
