# For @akvns-backend team: Yes, I kinda love Terraforming.
#
# (remember to setup your AWS IAM credentials in env vars)
#
# aws s3 mb s3://arknights-vietnam-station-terraform-state --region ap-southeast-1
#
# aws dynamodb create-table \
#     --table-name arknights-vietnam-station-terraform-locks \
#     --attribute-definitions AttributeName=LockID,AttributeType=S \
#     --key-schema AttributeName=LockID,KeyType=HASH \
#     --billing-mode PAY_PER_REQUEST \
#     --region ap-southeast-1
#
# terraform init
# terraform workspace new prod
# terraform workspace select prod
# terraform plan
# terraform apply
#
# In case of "I fucked up":
# terraform destroy

# "Good luck with that shit."
# - Yours truly, Swyrin.

terraform {
  backend "s3" {
    bucket         = "arknights-vietnam-station-terraform-state"
    key            = "terraform.tfstate"
    region         = "ap-southeast-1"
    encrypt        = true
    dynamodb_table = "arknights-vietnam-station-terraform-locks"
  }
}
