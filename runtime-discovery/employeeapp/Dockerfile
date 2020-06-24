# stage 1
FROM node:alpine AS dreambike-fe-build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# stage 2
FROM nginx:alpine
COPY --from=dreambike-fe-build app/dist/employeeapp /usr/share/nginx/html
EXPOSE 80

# used by: docker build --pull --name employeeapp --rm -f "Dockerfile" -t employeeapp:latest "."
# build with: docker build -t angular-app .
# run with: docker run --name angular-app -it --rm -p 9000:80 angular-app
# run in compose: docker-compose up -d

# add to docker-compose.yml:
# version: '3.3'
# services:
#   angular-docker:
#     container_name: angular-docker-container
#     build: ./app-to-run-inside-docker
#     ports:
#       - '9000:80'