package com.symw.service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

import com.symw.entity.Role;
import com.symw.exception.AppException;
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

	public String getAuthenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getName();
	}

	public User createUser(String firstName, String lastName, String email, String password) {
		User user = new User();
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setEmail(email);
		user.setPassword(passwordEncoder.encode(password));
		Role userRole = roleRepository.findByName("ROLE_USER").
				orElseThrow(() -> new AppException("User role not set."));
		user.setRoles(Collections.singleton(userRole));

		return userRepository.save(user);
	}
}
