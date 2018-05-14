package com.symw.controller;

import java.util.Optional;
import java.util.logging.Logger;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.symw.entity.Account;
import com.symw.service.AccountService;

@Controller
public class ApplicationController {

	private static final Logger LOGGER = Logger.getLogger(RegisterController.class.getName());
	
	@Autowired
	private AccountService accountService;

	@RequestMapping(value = "/app", method = RequestMethod.GET)
	public ModelAndView application(ModelAndView modelAndView, Account account) {
		
		modelAndView.addObject(account);
		modelAndView.setViewName("app");
		return modelAndView;
	}
	
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
	
//	@RequestMapping(value = "/app/createAccount", method = RequestMethod.POST)
//	public String createAccount2(
//			@ModelAttribute @Valid Account account,
//			BindingResult bindingResult,
//			Model model) {
//		Optional<Account> checkAccount = accountService.findByName(account.getName());
//		if (checkAccount.isPresent()) {
//			LOGGER.info("The account " + account.getName() + " already exists.");
//			model.addAttribute("accountAlreadyExists", "This account already exists.");
//			bindingResult.reject("name");
//		}
//		
//		if (!bindingResult.hasErrors()) {
//			accountService.saveAccount(account);
//		}
//		
//		return "redirect:app";
//	}
}
