package com.dknapik.flowershop.database;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.dknapik.flowershop.model.Bouquet;
import com.dknapik.flowershop.model.Flower;
import com.dknapik.flowershop.model.Account;

/**
 * 
 * Class used for initializing some values inside database used by application.
 * Regardless of debug mode, this application creates root users with admin privileges
 * that allows later client to configure application on its own.
 * 
 * @author Damian
 *
 */
@Component
public class DatabaseSeeder implements CommandLineRunner {
	
	@Value("${app-debug-mode}")
	private boolean debugMode;
	
	private final BouquetRepository bouquetRepository;
	private final FlowerRepository flowerRepository;
	private final AccountRepository accountRepository;
	
	public DatabaseSeeder(BouquetRepository bouquetRepository, FlowerRepository flowerRepository, AccountRepository accountRepository) {
		this.bouquetRepository = bouquetRepository;
		this.flowerRepository = flowerRepository;
		this.accountRepository = accountRepository;
	}
	
	
	@Override
	public void run(String... args) throws Exception {
		
		
		initializeAccounts();
		
		if(debugMode) {
			initializeFlowers();
			initializeBouquets();	
		}
	}
	
	/**
	 * Create basic user accounts
	 * root account is always initialized
	 */
	public void initializeAccounts() {
		List<Account> initialDataAccounts = new ArrayList<>();
		
		if(accountRepository.findByName("root") == null) {
			initialDataAccounts.add(new Account("root", "root", "root@test.pl", "Admin"));
		}
		
		
		if(debugMode) {
			initialDataAccounts.add(new Account("employee", "employee", "employee@test.pl", "Employee"));
			initialDataAccounts.add(new Account("user", "user", "user@test.pl", "User"));	
		}
		
		accountRepository.saveAll(initialDataAccounts);
	}
	
	/**
	 * Initialize database with flowers, used for debugging/testing purposes
	 */
	public void initializeFlowers() {
		List<Flower> initialDataFlowers = new ArrayList<>();
		
		initialDataFlowers.add(new Flower("Róża", 5.00));
		initialDataFlowers.add(new Flower("Tulipan", 4.00));
		initialDataFlowers.add(new Flower("Frezja", 6.00));
		
		flowerRepository.saveAll(initialDataFlowers);
	}
	
	/**
	 * Initialize database with Bouquets consisting of initialized flowers, used for debugging/testing purposes
	 */
	public void initializeBouquets() {
		List<Bouquet> initialDataBouquets = new ArrayList<>();
		List<Flower> flowerList = new ArrayList<>();
		Flower flower;
		
		flower = flowerRepository.findByName("Tulipan");	
		flower.setQuantity(5);
		flowerList.add(flower);
		System.out.println("FLOWER NAME : - " +flower.getName());
		initialDataBouquets.add(new Bouquet("Basic Bouquet", 10, flowerList));
		
		/*
		flowerList = new ArrayList<>();
		flower = flowerRepository.findByName("Róża");
		flower.setQuantity(5);
		flowerList.add(flower);
		
		flower= flowerRepository.findByName("Tulipan");
		flower.setQuantity(5);
		flowerList.add(flower);
		
		initialDataBouquets.add(new Bouquet("Intermediate Bouquet", 15, flowerList));
		*/
		bouquetRepository.saveAll(initialDataBouquets);
	}

}
