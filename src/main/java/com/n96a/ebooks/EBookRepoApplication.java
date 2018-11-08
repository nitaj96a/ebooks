package com.n96a.ebooks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.n96a.ebooks.properties.FileStorageProperties;

@SpringBootApplication
@RestController
@EnableConfigurationProperties({
	FileStorageProperties.class
})
public class EBookRepoApplication {

	public static void main(String[] args) {
		SpringApplication.run(EBookRepoApplication.class, args);
	}
	
	@RequestMapping(value = "^/(?!api/|/api)([a-z0-9]+)$")   //^/(?!ignoreme|ignoreme2|ignoremeN)([a-z0-9]+)$    
    public String redirect() {
        // Forward to home page so that route is preserved.
        return "forward:/";
    }
}
