package com.symw.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("/home");
		registry.addViewController("/home").setViewName("/home");
		registry.addViewController("/app").setViewName("/app");
		registry.addViewController("/register").setViewName("/register");
		registry.addViewController("/login").setViewName("/login");
	}
	
//	@Override
//	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler(
//				"/webjars/**",
//				"/img/**",
//				"/css/**",
//				"/js/**")
//		.addResourceLocations(
//				"classpath:/META-INF/resources/webjars",
//				"classpath:/static/img/",
//				"classpath:/static/css/",
//				"classpath:/static/js/");
//	}
}
