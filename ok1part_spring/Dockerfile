FROM openjdk:20

#WORKDIR /app

VOLUME /tmp

ARG JAR_FILE=target/ok1part_spring.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","app.jar"]

