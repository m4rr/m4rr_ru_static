cd ~/m4rr_ru_static
git pull && docker-compose build

cd ~/blog-m4rr-deploy
git pull && docker-compose build

cd ~
docker stop nginx-proxy

cd ~/m4rr_ru_static
docker-compose down

cd ~/blog-m4rr-deploy
docker-compose down
docker-compose up -d

cd ~/m4rr_ru_static
docker-compose up -d

cd ~
# to build from scratch:
#docker run -d -p 80:80 --restart=unless-stopped --name nginx-proxy -e ENABLE_IPV6=true -v /var/run/docker.sock:/tmp/docker.sock jwilder/nginx-proxy
# https://stackoverflow.com/a/52989931
docker start nginx-proxy
docker network connect m4rrrustatic_default nginx-proxy
docker network connect blogm4rrdeploy_default nginx-proxy
