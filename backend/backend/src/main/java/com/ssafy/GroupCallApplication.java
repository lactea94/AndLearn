package com.ssafy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.boot.system.ApplicationPidFileWriter;


import java.nio.charset.StandardCharsets;

@SpringBootApplication
public class GroupCallApplication {
	public static void main(String[] args) {
        // SpringApplication.run(GroupCallApplication.class, args);
        SpringApplication app = new SpringApplication(GroupCallApplication.class);
        app.addListeners(new ApplicationPidFileWriter()); // pid 파일을 생성하는 writer 등록
        app.run(args);
    }

    @Bean
    public HttpMessageConverter<String> responseBodyConverter() {
        return new StringHttpMessageConverter(StandardCharsets.UTF_8);
    }

    @Bean
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        return characterEncodingFilter;
    }
}
