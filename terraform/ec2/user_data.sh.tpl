#!/bin/bash
sudo apt-get update

sudo apt-get install -y git apt-transport-https ca-certificates curl software-properties-common python3-pip

pip3 install flask flask_cors python-dotenv mysql-connector-python

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

sudo usermod -aG docker ubuntu

cd /home/ubuntu
git clone https://${github_token}@github.com/sebastian-godoy/AYD2_V1S2025_PROYECTO_G1.git

cat <<EOF > /home/ubuntu/AYD2_V1S2025_PROYECTO_G1/backend/app/config/.env
DB_HOST=${db_host}
DB_USER=${db_user}
DB_PASSWORD=${db_password}
DB_NAME=${db_name}
DB_PORT=3306
EOF

sudo docker build -t api-ayd2 .
docker run -d -p 5000:5000 --name api-container api-ayd2
