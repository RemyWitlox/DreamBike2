FROM adoptopenjdk:8-jre-hotspot
RUN groupadd -r spring && useradd -r spring -g spring
USER spring:spring
ARG JAR_FILE=runtime-discovery/springboot-rest-api-sample/target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"] 