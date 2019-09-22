package com.dknapik.flowershop.api;


import javax.validation.ValidationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public ResponseEntity<?> createAccount(@RequestBody AccountViewModel accountViewModel, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			log.error("Couldn't map provided credentials with AccountViewModel");
			return new ResponseEntity<>("Couldn't match provided credentials with database data", HttpStatus.BAD_REQUEST);
		}
		this.service.createNewUser(accountViewModel);
		return new ResponseEntity<>("Account created succesfuly", HttpStatus.OK);
	}
	
	@GetMapping()
	public ResponseEntity<?> retrieveAccount(@RequestParam String accountID) {
		try {
			return new ResponseEntity<>(this.service.retrieveAccountDetails(accountID), HttpStatus.OK);
		} catch(Exception e) {
			log.error(e.getMessage());
		}
		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

}
