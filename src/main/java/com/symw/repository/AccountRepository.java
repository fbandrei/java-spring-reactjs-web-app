package com.symw.repository;

import com.symw.entity.Account;
import com.symw.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
	
	Optional<Account> findByName(String name);
	Iterable<Account> findAllByUserId(Long UserId);
	Optional<Account> findByNameAndUserId(String name, Long id);

	Account findByAccountNumber(Long accountNumber);
}
