FROM golang:alpine as BUILD

ENV HUGO_VERSION="0.57.2"

# RUN mkdir -p /home


RUN echo https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz

RUN apk --no-cache add \
    curl \
    git \
    libstdc++ \
    # libstdc++6 \
  && curl -SL https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz \
    -o /home/hugo.tar.gz \
  && tar -xzf /home/hugo.tar.gz -C /home \
  # && mv /home/hugo /usr/local/bin/ \
  && chmod +x /home/hugo \
  && apk del curl
  # && rm -rf /tmp/*

RUN echo $PATH

COPY . /home
WORKDIR /home

RUN ./hugo version
RUN ./hugo


FROM nginx:1.17.2-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /home/public /usr/share/nginx/html

EXPOSE 80
