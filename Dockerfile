FROM nginx:1.15.2-alpine

COPY ./dist /var/www
COPY nginx.local.conf /etc/nginx/nginx.conf
EXPOSE 80







