FROM m4rr/hugo-extended as BUILD
LABEL maintainer="m4rr (remarr+docker@gmail.com)"

COPY . /src
WORKDIR /src
ENV HUGO_ENV production
RUN hugo

FROM nginx:1.17.2-alpine
LABEL maintainer="m4rr (remarr+docker@gmail.com)"

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /src/public /usr/share/nginx/html

EXPOSE 80
