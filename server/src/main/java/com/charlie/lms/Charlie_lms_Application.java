package com.charlie.lms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;


@EnableGlobalMethodSecurity(prePostEnabled = true)
@SpringBootApplication
public class Charlie_lms_Application {

	public static void main(String[] args) {
		SpringApplication.run(Charlie_lms_Application.class, args);
	}

	

}
