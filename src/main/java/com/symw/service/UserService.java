package com.symw.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.symw.entity.User;
import com.symw.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public void createUser(int id, String password, String firstName, String lastName) {
		
		userRepository.findAll();
		
		User user = new User();
		user.setId(id);
		user.setPassword(password);
		user.setFirstName(firstName);
		user.setLastName(lastName);
		userRepository.save(user);
	}
	
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
	
	public void updateUser(User user) {

	}
	
	public Iterable<User> getAllUsers() {
		
		return userRepository.findAll();
	}
}
