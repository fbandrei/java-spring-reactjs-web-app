package com.symw.controller;

import com.symw.entity.Account;
import com.symw.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.Optional;
import java.util.logging.Logger;

@Controller
public class ApplicationController {

	private static final Logger LOGGER = Logger.getLogger(RegisterController.class.getName());
	
	@Autowired
	private AccountService accountService;

	@RequestMapping(value = "/app/createAccount", method = RequestMethod.POST)
	public ModelAndView createAccount(
			ModelAndView modelAndView,
			@Valid Account account,
			BindingResult bindingResult) {
		modelAndView.setViewName("app");
		Optional<Account> checkAccount = accountService.findByName(account.getName());
		if (checkAccount.isPresent()) {
			LOGGER.info("The account " + account.getName() + " already exists.");
			bindingResult.reject("name");
			modelAndView.addObject("accountAlreadyExists", "This account already exists.");
		}
		
		if (!bindingResult.hasErrors()) {
			accountService.saveAccount(account);
		}
		
		return modelAndView;
	}
}
