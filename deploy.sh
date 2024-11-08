#!/usr/bin/env bash
dt=$(date '+%d/%m/%Y %H:%M:%S');

echo "> Deploy Joyfulvillage"
sudo su

cd /home/ec2-user/prod-front
if ! docker compose pull; then
        echo "Failed to pull images." > deploy-result.txt
        exit 1
fi

# Start the containers in detached mode
if ! docker compose up -d; then
     echo "Failed to start containers."  > deploy-result.txt
         exit 1
         fi
         
         
echo "[$dt] Containers are up-to-date and running." >> deploy-result.txt

# chmod +x ./deploy.sh
# docker compose pull
# docker compose up -d
