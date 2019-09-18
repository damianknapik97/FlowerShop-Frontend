package com.dknapik.flowershop.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.dknapik.flowershop.api.viewmodel.AccountViewModel;
import com.dknapik.flowershop.database.AccountRepository;
import com.dknapik.flowershop.model.Account;

@Service
public class AccountService {
	
	private final AccountRepository accountRepo;
	
	public AccountService(AccountRepository accountRepo) {
		this.accountRepo = accountRepo;
	}
	
	public void createNewUser(AccountViewModel accViewModel) {
		ModelMapper mapper = new ModelMapper();
		this.accountRepo.saveAndFlush(mapper.map(accViewModel, Account.class));
	}
	

}
