package com.dknapik.flowershop.database;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.money.CurrencyUnit;
import javax.money.Monetary;

import org.javamoney.moneta.Money;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.dknapik.flowershop.model.Bouquet;
import com.dknapik.flowershop.model.Flower;
import com.dknapik.flowershop.model.Account;
import com.dknapik.flowershop.model.FlowerPack;

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
	
	private final CurrencyUnit currency;
	
	
	@Autowired
	public DatabaseSeeder(BouquetRepository bouquetRepository, FlowerRepository flowerRepository, AccountRepository accountRepository, Environment env) {
		this.bouquetRepository = bouquetRepository;
		this.flowerRepository = flowerRepository;
		this.accountRepository = accountRepository;
		
		this.currency = Monetary.getCurrency(env.getProperty("app-monetary-currency"));
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
		
		initialDataFlowers.add(new Flower("Róża", Money.of(5.00, currency)));
		initialDataFlowers.add(new Flower("Tulipan", Money.of(4.00, currency)));
		initialDataFlowers.add(new Flower("Frezja", Money.of(6.00, currency)));
		
		flowerRepository.saveAll(initialDataFlowers);
	}
	
	/**
	 * Initialize database with Bouquets consisting of initialized flowers, used for debugging/testing purposes
	 */
	public void initializeBouquets() {
		Bouquet bouquet;
		Set<FlowerPack> flowerList;
		
		flowerList = new HashSet<>();
		flowerList.add(new FlowerPack(flowerRepository.findByName("Róża"), 5));
		bouquet = new Bouquet("Basic", Money.of(10, currency), flowerList);
		bouquetRepository.saveAndFlush(bouquet);
		
		flowerList = new HashSet<>();
		flowerList.add(new FlowerPack(flowerRepository.findByName("Róża"), 5));
		flowerList.add(new FlowerPack(flowerRepository.findByName("Tulipan"), 3));
		bouquet = new Bouquet("Expanded", Money.of(15, currency), flowerList);
		bouquetRepository.saveAndFlush(bouquet);
		
	}
	
}
