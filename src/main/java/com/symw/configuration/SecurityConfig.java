package com.symw.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.symw.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	public static final String ADMIN = "ADMIN";
	public static final String USER = "USER";
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
			.antMatchers("/", "/home", "/register", "/confirm", "/loginAndroid/{email}/{password}", 
					"/checkIfEmailExists/{email}", "/saveAccountAndSendEmail", "/enableUser", "/deleteUnactivatedAccounts")
			.permitAll();
		
		http.formLogin().permitAll();
		http.formLogin().defaultSuccessUrl("http://localhost:3000/app");
		
		http.logout().permitAll();
		http.logout().logoutSuccessUrl("http://localhost:3000/");
		
		http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/403");
		http.csrf().disable();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
