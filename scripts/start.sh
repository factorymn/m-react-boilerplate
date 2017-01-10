#!/bin/bash
cd /srv/smarticon-frontend
sudo npm i --production
sudo forever stop "smarticon-frontend"
sudo env PORT=80 NODE_PATH="./src" NODE_ENV="production" forever start --uid 'smarticon-frontend' -a -c 'node --optimize_for_size --max_old_space_size=400 --gc_interval=100' ./server
