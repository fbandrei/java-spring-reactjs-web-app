package com.symw.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nulabinc.zxcvbn.Strength;
import com.nulabinc.zxcvbn.Zxcvbn;
import com.symw.entity.User;
import com.symw.service.EmailService;
import com.symw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.*;
import java.util.logging.Logger;

@Controller
public class RegisterController {
	
	private static final Logger LOGGER = Logger.getLogger(RegisterController.class.getName());
	
	@Autowired
	private UserService userSerivce;
	@Autowired
	private EmailService emailService;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public ModelAndView showRegistrationPage(ModelAndView modelAndView, User user) {
		modelAndView.addObject("user", user);
		modelAndView.setViewName("register");
		return modelAndView;
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ModelAndView processRegistrationForm(ModelAndView modelAndView, @Valid User user,
			BindingResult bindingResult,
			HttpServletRequest httpServletRequest) {
		
		Optional<User> userExists = userSerivce.findByEmail(user.getEmail());
		
		if (userExists.isPresent()) {
			modelAndView.addObject("alreadyRegisteredMessage", "The email address provided already exists.");
			modelAndView.setViewName("register");
			bindingResult.reject("email");	
		}
		
		if (bindingResult.hasErrors()) {
			modelAndView.setViewName("register");
		} else { // create user and send confirmation e-mail
			
			user.setEnabled(false);
			user.setConfirmationToken(UUID.randomUUID().toString());
			userSerivce.saveUser(user);
			
			String appUrl = httpServletRequest.getScheme() + "://" + httpServletRequest.getServerName() + ":8080";
			
			SimpleMailMessage registrationEmail = fillMailContent(user,
					"SYMW - confirm your registration",
					"In order to confirm your e-mail address please click the following link:\n"
							+ appUrl + "/confirm?token=" + user.getConfirmationToken(),
							"save.and.plan.your.money");
			emailService.sendEmail(registrationEmail);
			modelAndView.addObject("confirmationMessage", "A confirmation e-mail has been sent to " + user.getEmail());
			modelAndView.setViewName("register");
		}
		
		return modelAndView;	
		
	}

	private SimpleMailMessage fillMailContent(User user, String subject, String text, String fromAddress) {
		SimpleMailMessage registrationEmail = new SimpleMailMessage();
		registrationEmail.setTo(user.getEmail());
		registrationEmail.setSubject(subject);
		registrationEmail.setText(text);
		registrationEmail.setFrom(fromAddress);
		return registrationEmail;
	}
	
	@RequestMapping(value = "/confirm", method = RequestMethod.GET)
	public ModelAndView showConfirmationPage(ModelAndView modelAndView, @RequestParam("token") String token) {
		
		User user = userSerivce.findByConfirmationToken(token);
		if (user == null) {
			modelAndView.addObject("invalidToken", "This is an invalid confirmation link.");
		} else {
			modelAndView.addObject("confirmationToken", user.getConfirmationToken());
		}
		modelAndView.setViewName("confirm");
		return modelAndView;
	}
	
	@RequestMapping(value = "/confirm", method = RequestMethod.POST)
	public ModelAndView processConfirmationForm(ModelAndView modelAndView,
			BindingResult bindingResult,
			@RequestParam Map requestParams,
			RedirectAttributes redir) {
		
		modelAndView.setViewName("confirm");
		Zxcvbn passwordCheck = new Zxcvbn();
		Strength strength = passwordCheck.measure((String) requestParams.get("password"));
		
		if (strength.getScore() < 3) {
			bindingResult.reject("password");
			redir.addFlashAttribute("errorMessage", "Your password is too weak. Choose a stronger one.");
			modelAndView.setViewName("redirect:confirm?token=" + requestParams.get("token"));
			return modelAndView;
		}
		
		User user = userSerivce.findByConfirmationToken((String) requestParams.get("token"));
		user.setPassword(passwordEncoder().encode((CharSequence) requestParams.get("password")));
		user.setEnabled(true);
		userSerivce.saveUser(user);
		
		modelAndView.addObject("successMessage", "Your password has been set.");
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/checkIfEmailExists/{email}", method = RequestMethod.GET, produces = "text/plain")
	@ResponseBody
	public String checkIfEmailExists(
			@PathVariable("email") String email) {
		
		LOGGER.info(email);
		Optional<User> user = userSerivce.findByEmail(email);
		if (user.isPresent()) {
			LOGGER.info("User is present.");
			return "YES";
		} else {
			return "NO";
		}
	}
	
	
	@RequestMapping(value = "/saveAccountAndSendEmail", method = RequestMethod.POST)
	@ResponseBody
	public void registrationAndroid(@RequestBody String receivedData) {
		
		ObjectMapper mapper = new ObjectMapper();
		Map<String, String> registrationData = null;
		try {
			registrationData = mapper.readValue(receivedData, HashMap.class);
		} catch (IOException e) {
			e.printStackTrace();
		}
		String email = registrationData.get("email");
		String password = registrationData.get("password");
		String firstName = registrationData.get("firstName");
		String lastName = registrationData.get("lastName");
		String activationCode = registrationData.get("activationCode");
		
		User user = new User();
		user.setPassword(passwordEncoder().encode((CharSequence) password));
		user.setEnabled(false);
		user.setEmail(email);
		user.setFirstName(firstName);
		user.setLastName(lastName);
		userSerivce.saveUser(user);
		
		SimpleMailMessage mail = fillMailContent(user, "Activate your account",
				"Greetings from SYMW, active your account by introducing the following code in the mobile application: " + activationCode,
				"save.and.play.your.money");
		emailService.sendEmail(mail);
			
	}
	
	@RequestMapping(value="/removeUnactivatedAccounts", method = RequestMethod.DELETE)
	public void removeUnactivatedAccounts() {
		
		Iterable<User> users = userSerivce.getAllUsers();
		Iterator<User> iterator = users.iterator();
		while(iterator.hasNext()) {
			User user = iterator.next();
			if (!user.isEnabled()) {
				userSerivce.deleteUser(user);
			}
		}
	}
	
	@RequestMapping (value="/enableAccount", method = RequestMethod.PUT)
	public void enableAccountFromAndroid(@RequestParam String email) {
		
		Optional<User> optionalUser = userSerivce.findByEmail(email);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			user.setEnabled(true);
			userSerivce.saveUser(user);
		}
	}

}
