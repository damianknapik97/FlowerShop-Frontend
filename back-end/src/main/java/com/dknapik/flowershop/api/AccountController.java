package com.dknapik.flowershop.api;

import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.dknapik.flowershop.api.viewmodel.AccountViewModel;
import com.dknapik.flowershop.database.AccountRepository;
import com.dknapik.flowershop.model.Account;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {

	private final AccountRepository accountRepo;

	@Autowired
	public AccountController(AccountRepository accountRepo) {
		this.accountRepo = accountRepo;
	}
	
	@PostMapping("/register")
	public RedirectView createAccount(@RequestBody AccountViewModel accountViewModel, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			throw new ValidationException("Errors detected, account couldn't be created");
		}
		
		Account newAccount = new Account(accountViewModel.getName(),
										 accountViewModel.getPassword(), 
										 accountViewModel.getEmail(), 
										 accountViewModel.getRole());
		this.accountRepo.saveAndFlush(newAccount);
		
		return new RedirectView("");
	}
	
	
	@GetMapping("/{name}")
	public Account getAccountInformations(@PathVariable("name") final String accName) {		
		System.out.println(accName);
		return Optional.of(this.accountRepo.findByName(accName)).orElse(null);
	}
	
}
