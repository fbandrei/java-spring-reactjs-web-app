package com.symw.controller;

import com.symw.entity.CustomUserDetails;
import com.symw.repository.UserRepository;
import com.symw.security.CurrentUser;
import com.symw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.logging.Logger;

@Controller
public class UserController {
	
	private static final Logger LOGGER = Logger.getLogger(UserController.class.getName());

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
	public void getCurrentUser(@CurrentUser CustomUserDetails currentUser) {
		// TODO continue the implementation
	}
	


}
