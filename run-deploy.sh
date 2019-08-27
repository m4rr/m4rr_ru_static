git pull
docker-compose build
docker stop nginx-proxy
docker-compose down && docker-compose up -d
docker network connect m4rrrustatic_default nginx-proxy
docker start nginx-proxy
