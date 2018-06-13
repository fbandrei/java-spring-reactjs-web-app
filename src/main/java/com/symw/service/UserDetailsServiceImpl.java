package com.symw.service;

import com.symw.entity.CustomUserDetails;
import com.symw.entity.User;
import com.symw.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	private static final Logger LOGGER = Logger.getLogger(UserDetailsServiceImpl.class.getName());
	@Autowired
	private UserRepository userRepository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		LOGGER.info("The received username for login is: " + username);
		
		Optional<User> user = userRepository.findByEmail(username);
		if (!user.isPresent()) {
			throw new UsernameNotFoundException(username);
		}
		return CustomUserDetails.create(user.get());
	}

	@Transactional
	public UserDetails loadUserById(Long id) {
		User user = userRepository.findById(id).orElseThrow(
				() -> new UsernameNotFoundException("User with id: " + id + " not found")
		);

		return CustomUserDetails.create(user);
	}

}
