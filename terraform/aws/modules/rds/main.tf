resource "aws_db_subnet_group" "main" {
  name       = "akvns-db-subnet-group"
  subnet_ids = var.subnet_ids
  tags = {
    Name = "akvns-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  identifier              = "akvns-postgres"
  engine                  = "postgres"
  engine_version          = "17"
  instance_class          = "db.t3.medium"
  allocated_storage       = 20
  max_allocated_storage   = 100
  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = var.security_group_ids
  multi_az                = true
  username                = var.rds_username
  password                = var.rds_password
  skip_final_snapshot     = true
  publicly_accessible     = false
  storage_encrypted       = true
  tags = {
    Name = "akvns-postgres"
  }
}
