package com.symw.controller;

import java.util.Collection;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.symw.entity.User;
import com.symw.repository.UserRepository;
import com.symw.service.UserService;

@Controller
public class UserController {
	
	private static final Logger LOGGER = Logger.getLogger(UserController.class.getName());

	private final UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@GetMapping("/users2")
	Collection<User> userCollection() {
		return (Collection<User>) this.userRepository.findAll();
	}
	
	@ResponseBody
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public Iterable<User> getUsers() {
		return userRepository.findAll();
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home() {
		return "home";
	}
	
	@RequestMapping(value = "addUser", method = RequestMethod.GET)
	public String addUser(
			@RequestParam(value = "password", defaultValue = "null") String password,
			@RequestParam(value = "firstname", defaultValue = "null") String firstname,
			@RequestParam(value = "lastname", defaultValue = "null") String lastname) {
		
		System.out.println("\nAdd a new user");
		LOGGER.info(
				" Password: " + password
				+ " First Name" + firstname
				+ " Last name" + lastname);
		
		userService.createUser(0, password, firstname, lastname);
		LOGGER.info("Account succesfully created");
		return "home";
	}
	
	@RequestMapping(value = "/createAccount", method = RequestMethod.GET)
	public String createAccount() {
		return "createAccount";
	}
}
