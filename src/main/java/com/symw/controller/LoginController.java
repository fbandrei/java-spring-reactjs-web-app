package com.symw.controller;

import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.symw.entity.User;
import com.symw.service.UserService;

@Controller
public class LoginController {

	private static final Logger LOGGER = Logger.getLogger(LoginController.class.getName());
	private static final String EMAIL = "email";
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView showLoginPage(ModelAndView modelAndView, User user) {
		modelAndView.addObject("user", user);
		modelAndView.setViewName("login");
		return modelAndView;
	}
	
	@RequestMapping(value = "/loginAndroid/{email}/{password}", method = RequestMethod.GET, produces = "text/plain")
	@ResponseBody
	public String loginAndroid(
			@PathVariable("email") String email,
			@PathVariable("password") String password) {
		
		Optional<User> loggedInUser = userService.findByEmail(email);
		
		LOGGER.log(Level.INFO, "Login email address: " + email);
		if (!loggedInUser.isPresent() || 
				!passwordEncoder().matches(password, loggedInUser.get().getPassword())) {
			return "NOK";
		}
		
		return "OK";
	}
	
}
