package com.ssafy.forestauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ForestAuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(ForestAuthApplication.class, args);
    }

}
