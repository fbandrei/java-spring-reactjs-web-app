package com.symw.repository;

import com.symw.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{
	
	User findByConfirmationToken(String confirmationToken);
	
	Optional<User> findByEmail(String email);

	Boolean existsByEmail(String email);

	Optional<User> findById(Long id);

}
