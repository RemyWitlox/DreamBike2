#
# Build stage
#
FROM maven:3.6-jdk-8 AS build
COPY runtime-discovery/gateway/src /home/app/src
COPY runtime-discovery/gateway/pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM adoptopenjdk:8-jre-hotspot
RUN groupadd -r spring && useradd -r spring -g spring
USER spring:spring
ARG JAR_FILE=target/*.jar
COPY --from=build /home/app/${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"] 
