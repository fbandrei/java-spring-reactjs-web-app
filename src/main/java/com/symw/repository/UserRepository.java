package com.symw.repository;

import com.symw.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer>{
	
	User findByConfirmationToken(String confirmationToken);
	
	Optional<User> findByEmail(String email);

	Boolean existsByEmail(String email);

	Optional<User> findById(Long id);

	Boolean existsById(Long id);
	
}
