package com.dknapik.flowershop.database;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {
	
	private BouquetRepository bouquetRepository;
	private FlowerRepository flowerRepository;
	private UserRepository userRepository;
	
	@Autowired
	public DatabaseSeeder(BouquetRepository bouquetRepository, FlowerRepository flowerRepository, UserRepository userRepository) {
		this.bouquetRepository = bouquetRepository;
		this.flowerRepository = flowerRepository;
		this.userRepository = userRepository;
	}
	
	
	@Override
	public void run(String... args) throws Exception {
		List<BouquetRepository> initialData = new ArrayList<>();
		
		
	}
	

}
