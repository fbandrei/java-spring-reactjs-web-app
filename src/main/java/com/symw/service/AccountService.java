package com.symw.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.symw.entity.Account;
import com.symw.repository.AccountRepository;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;
	
	public Optional<Account> findByName(String name) {
		
		return accountRepository.findByName(name);
	}
	
	public void saveAccount(Account account) {
		
		accountRepository.save(account);
	}
}
