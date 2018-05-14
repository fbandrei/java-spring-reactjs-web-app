package com.symw.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.symw.entity.User;

public interface UserRepository extends CrudRepository<User, Integer>{
	
	public User findByConfirmationToken(String confirmationToken);
	
	Optional<User> findByEmail(String email);
	
}
