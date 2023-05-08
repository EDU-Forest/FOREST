FROM adoptopenjdk/openjdk11
COPY build/libs/forest-study-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev", "app.jar"]
