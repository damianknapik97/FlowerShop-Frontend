package com.dknapik.flowershop.api;


import javax.validation.ValidationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dknapik.flowershop.api.viewmodel.AccountViewModel;
import com.dknapik.flowershop.model.Account;
import com.dknapik.flowershop.services.AccountService;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {

	protected final Logger log = LogManager.getLogger(getClass().getName()); 
	private final AccountService service;
	
	@Autowired
	public AccountController(AccountService service) {	
		this.service = service;
	}

	@PostMapping("/register")
	public void createAccount(@RequestBody AccountViewModel accountViewModel, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			log.error("Couldn't process register POST request");
			throw new ValidationException("Errors detected, account couldn't be created");
		}
		this.service.createNewUser(accountViewModel);
	}
	
	@GetMapping("/retrieve/{accountID}")
	public Account retrieveAccount(@PathVariable("accountID") String accountID) {
		try {
			return this.service.retrieveAccountDetails(accountID);
		} catch(Exception e) {
			log.error(e.getMessage());
		}
		return null;
	}

}
