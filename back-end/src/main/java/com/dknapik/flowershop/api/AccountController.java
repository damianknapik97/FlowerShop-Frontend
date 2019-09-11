package com.dknapik.flowershop.api;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dknapik.flowershop.api.viewmodel.AccountViewModel;
import com.dknapik.flowershop.database.AccountRepository;
import com.dknapik.flowershop.model.Account;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {

	AccountRepository accountRepo;

	@Autowired
	public AccountController(AccountRepository accountRepo) {
		this.accountRepo = accountRepo;
	}
	
	@PostMapping("/register")
	public void createAccount(@RequestBody AccountViewModel accountViewModel, BindingResult bindingResult) {
		System.out.println("!!!!!!!!!!!!!!!!!! POST REACH !!!!!!!!!!!!!");
		if(bindingResult.hasErrors()) {
			throw new ValidationException("Errors detected, account couldn't be created");
		}
		
		Account newAccount = new Account(accountViewModel.getName(),
										 accountViewModel.getPassword(), 
										 accountViewModel.getEmail(), 
										 accountViewModel.getRole());
		this.accountRepo.saveAndFlush(newAccount);
	}
	
}
