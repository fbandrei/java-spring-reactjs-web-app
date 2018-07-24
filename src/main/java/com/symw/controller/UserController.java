package com.symw.controller;

import com.symw.entity.CustomUserDetails;
import com.symw.entity.Global;
import com.symw.entity.User;
import com.symw.payloads.UserIdentityAvailability;
import com.symw.payloads.UserSummary;
import com.symw.repository.GlobalRepository;
import com.symw.repository.UserRepository;
import com.symw.security.CurrentUser;
import com.symw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;
import java.util.logging.Logger;

@RequestMapping("/api")
@Controller
public class UserController {
	
	private static final Logger LOGGER = Logger.getLogger(UserController.class.getName());

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GlobalRepository globalRepository;

	@GetMapping("/user/me")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> getCurrentUser(@CurrentUser CustomUserDetails currentUser) {
		LOGGER.info("Current user: " + currentUser.getEmail());
		UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getEmail(),
				currentUser.getFirstName(), currentUser.getLastName());
		return  ResponseEntity.ok(userSummary);
	}

	@GetMapping("/user/checkEmailAvailability")
	public ResponseEntity<?> checkEmailAvailability(@RequestParam(value = "email") String email) {
		Boolean isAvailable = !userRepository.existsByEmail(email);
		LOGGER.info("Does the following email already exists? [ " + email + " ] -> "  + !isAvailable);
		return ResponseEntity.ok(new UserIdentityAvailability(isAvailable));
	}

	@GetMapping("/toBeBudget")
	@ResponseBody
	public double getBudget() {

		User authenticatedUser = userService.getAuthenticatedUser();
		Optional<User> oUser = userRepository.findById(authenticatedUser.getId());
		if (oUser.isPresent()) {

			Optional<Global> oGlobal = globalRepository.findByUser(oUser.get());
			if (oGlobal.isPresent()) {
				return oGlobal.get().getBudget();
			}
		}

		return 0;
	}




}
