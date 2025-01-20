# Use OPEN JDK as the base image?
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

#COPY the JAE file to the container
COPY target/fleetsystem.jar  app.jar

#Expose the application port
EXPOSE 8081

#RUN the Spring Boot Application
CMD ["java", "-jar", "app.jar"]
