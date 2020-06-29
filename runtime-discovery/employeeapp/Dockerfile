# stage 1
FROM node:alpine AS build
WORKDIR /app
COPY . /app
RUN npm install && npm run build:prod && npm cache clean --force

# stage 2
FROM nginx:alpine
COPY --from=build app/dist/employeeapp /usr/share/nginx/html
EXPOSE 80

# build with: docker build -t dreambike/angular-app --pull=true .
# run with: docker run --name angular-app -it --rm -p 9000:80 angular-app
# push to dreambike: docker push dreambike/angular-app:latest
# run in compose: docker-compose up -d

# add to docker-compose.yml:
# version: '3.3'
# services:
#   angular-docker:
#     container_name: employeeapp
#     build: ./app-to-run-inside-docker
#     ports:
#       - '9000:80'
