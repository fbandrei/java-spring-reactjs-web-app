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

	public Iterable<Account> getAllAccounts() {
		return accountRepository.findAll();
	}

	public boolean createAccount(Account a) {
		Optional<Account> account = accountRepository.findByName(a.getName());
		if (account.isPresent()) {
			return false;
		} else {
			a.setDescription("");
			accountRepository.save(a);
			return true;
		}
	}
}
