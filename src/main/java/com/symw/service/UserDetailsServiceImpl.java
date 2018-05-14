package com.symw.service;

import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.symw.controller.LoginController;
import com.symw.entity.CustomUserDetails;
import com.symw.entity.User;
import com.symw.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	private static final Logger LOGGER = Logger.getLogger(UserDetailsServiceImpl.class.getName());
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		LOGGER.info("The received username for login is: " + username);
		
		Optional<User> user = userRepository.findByEmail(username);
		if (!user.isPresent()) {
			throw new UsernameNotFoundException(username);
		}
		
		return new CustomUserDetails(user);
	}

}
