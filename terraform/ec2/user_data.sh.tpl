#!/bin/bash
apt-get update
apt-get install -y git apt-transport-https ca-certificates curl software-properties-common

# Instalación de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

usermod -aG docker ubuntu

cd /home/ubuntu

git clone https://${github_token}@github.com/brandonT2002/AYD2_1S2025_PRAC_G1.git

cd AYD2_1S2025_PRAC_G1/Backend

cat <<EOF > .env
DB_HOST=${db_host}
DB_USER=${db_user}
DB_PASS=${db_password}
DB_NAME=${db_name}
DB_PORT=3306
EOF

docker build -t api-ayd2 .

cat <<EOL > /etc/systemd/system/api-docker.service
[Unit]
Description=API Flask AYD2 Docker Container
After=network.target docker.service
Requires=docker.service

[Service]
Restart=always
User=ubuntu
WorkingDirectory=/home/ubuntu/AYD2_1S2025_PRAC_G1/Backend
ExecStart=/usr/bin/docker run --rm -p 5000:5000 --env-file /home/ubuntu/AYD2_1S2025_PRAC_G1/Backend/.env --name api-ayd2 api-ayd2
ExecStop=/usr/bin/docker stop api-ayd2

[Install]
WantedBy=multi-user.target
EOL

# Correr el servicio (Qué dolor de cabeza es esto)
systemctl daemon-reload
systemctl enable api-docker.service
systemctl start api-docker.service
