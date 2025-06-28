#!/bin/bash
sudo apt-get update

sudo apt-get install -y git apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

sudo usermod -aG docker ubuntu

cd /home/ubuntu
git clone https://${github_token}@github.com/sebastian-godoy/AYD2_V1S2025_PROYECTO_G1.git

cd AYD2_V1S2025_PROYECTO_G1/backend

mkdir -p config

cat <<EOF > config/.env
DB_HOST=${db_host}
DB_USER=${db_user}
DB_PASS=${db_password}
DB_NAME=${db_name}
DB_PORT=3306
EOF

sudo docker build -t api-ayd2 .

sudo tee /etc/systemd/system/api-docker.service > /dev/null <<EOL
[Unit]
Description=API Flask AYD2 Docker Container
After=network.target docker.service
Requires=docker.service

[Service]
Restart=always
User=ubuntu
WorkingDirectory=/home/ubuntu/AYD2_V1S2025_PROYECTO_G1/backend
ExecStart=/usr/bin/docker run --rm -p 5000:5000 --env-file /home/ubuntu/AYD2_V1S2025_PROYECTO_G1/backend/config/.env --name api-ayd2 api-ayd2
ExecStop=/usr/bin/docker stop api-ayd2

[Install]
WantedBy=multi-user.target
EOL

sudo systemctl daemon-reload
sudo systemctl enable api-docker.service
sudo systemctl start api-docker.service
