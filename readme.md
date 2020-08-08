# m4rr.ru static

## deploy

```sh
$ ssh scw
$ cd m4rr_ru_static/
$ ls
$ ./kek.sh
```

## upgrade

`docker-compose up --force-recreate --build -d --remove-orphans`

## debug

```sh
tail -f ~/apache2/logs/other_vhosts_access.log
docker logs --tail 50 --follow --timestamps blog-m4rr-deploy_blog_1
tail -f ~/m4rr_ru_static/data/traefik/access.log
```