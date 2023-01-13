FROM node:16 as builder
WORKDIR /app

COPY .  .


RUN npm install 
RUN npm link @angular/cli

RUN  npm   run build  

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin

COPY  --from=builder /app/ssl/    /etc/nginx/app/ssl/

COPY --from=builder /app/nginx.conf  /etc/nginx/nginx.template

COPY --from=builder app/dist/energy-utility-platform /usr/share/nginx/html


CMD ["/bin/sh","-c", "envsubst < /etc/nginx/nginx.template >  /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
EXPOSE 4200
