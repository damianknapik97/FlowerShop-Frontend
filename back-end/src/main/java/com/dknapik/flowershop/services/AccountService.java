package com.dknapik.flowershop.services;

import java.io.IOException;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.dknapik.flowershop.api.viewmodel.AccountViewModel;
import com.dknapik.flowershop.database.AccountRepository;
import com.dknapik.flowershop.model.Account;

@Service
public class AccountService {
	
	protected final Logger log = LogManager.getLogger(getClass().getName()); 
	private final AccountRepository accountRepo;
	
	public AccountService(AccountRepository accountRepo) {
		this.accountRepo = accountRepo;
	}
	
	public void createNewUser(AccountViewModel accViewModel) {
		ModelMapper mapper = new ModelMapper();
		this.accountRepo.saveAndFlush(mapper.map(accViewModel, Account.class));
	}
	
	public Account retrieveAccountDetails(String id) throws IOException {
		UUID accId = UUID.fromString(id);	
		
		return accountRepo.findById(accId).orElseThrow(() -> new IOException("Couldn't map provided ID with any account from database"));
	}
	

}
