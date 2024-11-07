#!/usr/bin/env bash
echo "> Deploy Joyfulvillage"
sudo su
cd /home/ec2-user/prod-front
chmod +x ./deploy.sh
docker-compose pull
docker-compose up -d

#systemctl restart nginx

# npm -v
# npm install next@latest
# pm2 delete phymmr
# pm2 start "npx next start" --name phymmr