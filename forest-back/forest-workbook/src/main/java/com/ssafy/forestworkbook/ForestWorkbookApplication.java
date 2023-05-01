package com.ssafy.forestworkbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ForestWorkbookApplication {

    public static void main(String[] args) {
        SpringApplication.run(ForestWorkbookApplication.class, args);
    }

}
