package com.example.asemsBack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AsemsBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(AsemsBackApplication.class, args);
	}

}
