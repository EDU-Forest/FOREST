package com.ssafy.foreststudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class ForestStudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(ForestStudyApplication.class, args);
	}

}
