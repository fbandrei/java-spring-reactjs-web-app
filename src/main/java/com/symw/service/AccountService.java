package com.symw.service;

import com.symw.entity.Account;
import com.symw.entity.User;
import com.symw.repository.AccountRepository;
import com.symw.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.logging.Logger;

@Service
public class AccountService {

	private static final Logger LOGGER = Logger.getLogger(AccountService.class.getName());

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;

	public Optional<Account> findByName(String name) {
		
		return accountRepository.findByName(name);
	}
	
	public void saveAccount(Account account) {
		
		accountRepository.save(account);
	}

	public Iterable<Account> getAllAccounts() {
		User user = userService.getAuthenticatedUser();
		LOGGER.info("User: " + user.getId());
		return accountRepository.findAllByUserId(user.getId());
	}

	public boolean createAccount(Account a) {
		User user = userService.getAuthenticatedUser();
		Optional<Account> account = accountRepository.findByNameAndUserId(a.getName(), user.getId());
		if (account.isPresent()) {
			return false;
		} else {
			a.setDescription("");
			LOGGER.info("User: " + user.getId());
			a.setUser(userRepository.findById(user.getId()).get());
			accountRepository.save(a);
			return true;
		}
	}
}
