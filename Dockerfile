FROM m4rr/hugo-extended as BUILD

FROM nginx:1.17.2-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /src/public /usr/share/nginx/html

EXPOSE 80
