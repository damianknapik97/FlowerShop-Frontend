package com.dknapik.flowershop.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.javamoney.moneta.Money;

@Entity
public class FlowerPack {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private UUID id;
	@OneToOne()
	@JoinColumn(name = "flower_id", referencedColumnName = "id")
	private Flower flower;
	@Column
	private int numberOfFlowers;
	
	private Money totalCost;
	
	public FlowerPack(Flower flower, int numberOfFlowers) {
		super();
		this.flower = flower;
		this.numberOfFlowers = numberOfFlowers;
	}
	
	public int getNumberOfFlowers() {
		return numberOfFlowers;
	}
	public void setNumberOfFlowers(int numberOfFlowers) {
		this.numberOfFlowers = numberOfFlowers;
	}
	
	private Money countTotalCost() {
		return null;
	}
	
	//public getTotalCost
	
}
