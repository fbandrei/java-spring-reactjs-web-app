package com.symw.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.symw.entity.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
	
	Optional<Account> findByName(String name);
}
