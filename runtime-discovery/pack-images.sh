#!/bin/bash

echo "Performing a clean Maven build"
./mvnw clean package -DskipTests=true

echo "Setting the default builder for pack"
pack set-default-builder cloudfoundry/cnb:bionic

echo "Packing the Service"
cd service
pack build dreambike-service --env "BP_JAVA_VERSION=8.*"
cd ..

echo "Packing the BikeService"
cd bikeservice
pack build dreambike-bikeservice --env "BP_JAVA_VERSION=8.*"
cd ..

echo "Packing the Eureka Discovery Server"
cd registry
pack build dreambike-registry --env "BP_JAVA_VERSION=8.*"
cd ..

echo "Packing the Spring Cloud Gateway"
cd gateway
pack build dreambike-gateway --env "BP_JAVA_VERSION=8.*"
cd ..
