
package com.klef.sdp.backendproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.klef.sdp.backendproject.model")
@EnableJpaRepositories(basePackages = "com.klef.sdp.backendproject.repository")
public class BackendProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendProjectApplication.class, args);
    }
}
