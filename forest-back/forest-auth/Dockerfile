FROM adoptopenjdk/openjdk11
COPY build/libs/forest-auth-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "-Duser.timezone=Asia/Seoul", "app.jar"]
