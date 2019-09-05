package com.dknapik.flowershop.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.dknapik.flowershop.database.AccountRepository;

@RestController
@CrossOrigin
public class AccountController {

	AccountRepository accountRepo;

	@Autowired
	public AccountController(AccountRepository accountRepo) {
		this.accountRepo = accountRepo;
	}
	
}
