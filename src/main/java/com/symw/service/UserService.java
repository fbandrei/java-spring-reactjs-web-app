package com.symw.service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.logging.Logger;

import com.symw.entity.CustomUserDetails;
import com.symw.entity.Role;
import com.symw.exception.AppException;
import com.symw.payloads.SignUpRequest;
import com.symw.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.symw.entity.User;
import com.symw.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepository;
	private static final Logger LOGGER = Logger.getLogger(UserService.class.getName());

	
	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public User findByConfirmationToken(String confirmationToken) {
		return userRepository.findByConfirmationToken(confirmationToken);
	}
	
	public void saveUser(User user) {
		userRepository.save(user);
	}
	
	public void deleteUser(User user) {
		userRepository.delete(user);
	}
	
	public Iterable<User> getAllUsers() {
		
		return userRepository.findAll();
	}

	public User createUser(SignUpRequest request, String confirmationToken) {
		User user = new User();
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setConfirmationToken(confirmationToken);
		user.setEnabled(false);
		Role userRole = roleRepository.findByName("ROLE_USER").
				orElseThrow(() -> new AppException("User role not set."));
		user.setRoles(Collections.singleton(userRole));
		LOGGER.info("Year: " + request.getYear() + " Month: " + request.getMonth() + " Day: " + request.getDay());
		LocalDate date = LocalDate.of(request.getYear(), request.getMonth(), request.getDay());
		user.setJoiningDate(date);

		return userRepository.save(user);
	}

	public User getAuthenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		return  (User)userDetails;
	}
}
