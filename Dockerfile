FROM alpine:3.10.1 as BUILD

ENV HUGO_VERSION=0.57.2

RUN apk --no-cache add \
        curl \
        git \
    && curl -SL https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz \
        -o /tmp/hugo.tar.gz \
    && tar -xzf /tmp/hugo.tar.gz -C /tmp \
    && mv /tmp/hugo /usr/local/bin/ \
    && apk del curl \
    && rm -rf /tmp/*

COPY . /src
WORKDIR /src

RUN hugo

FROM nginx:1.17.2-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /src/public /usr/share/nginx/html

EXPOSE 80
