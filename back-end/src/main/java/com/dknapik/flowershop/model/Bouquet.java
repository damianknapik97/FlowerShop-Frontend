/**
 * 
 */
package com.dknapik.flowershop.model;

import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Cascade;

/**
 * @author Damian
 */
@Entity
public class Bouquet {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private UUID id;
	@Column//(unique = true)
	private String name;
	//@Column//(columnDefinition = "double not null")
	private double workCost;
	@Column//(columnDefinition = "integer default 1")
	private int quantity = 1;
	
	
	//@OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST})
	//@Cascade({CascadeType.SAVE_UPDATE})
	//@JoinColumn(name = "bouquet_id", referencedColumnName = "id")
	//private List<Flower> flowers;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinColumn(name = "bouquet_id", referencedColumnName = "id")
	private List<BouqetFlower> bouquetFlowers;
	
	
	public Bouquet(String name, double workPrice) {
		super();
		this.name = name;
		this.workCost = workPrice;
		//this.flowers = flowers;
	}

	/*
	public Bouquet(String name, double workPrice, int quantity, List<Flower> flowers) {
		super();
		this.name = name;
		this.workCost = workPrice;
		this.quantity = quantity;
		this.flowers = flowers;
		
		
	}
	*/
	
	public Bouquet(String name, double workPrice, int quantity, List<BouqetFlower> flowers2) {
		super();
		this.name = name;
		this.workCost = workPrice;
		this.quantity = quantity;
		this.bouquetFlowers = flowers2;
		
	}

	public UUID getId() {
		return id;
	}
	
	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getWorkPrice() {
		return workCost;
	}

	public void setWorkPrice(double workPrice) {
		this.workCost = workPrice;
	}
	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	/*

	public List<Flower> getFlowers() {
		return flowers;
	}

	public void setFlowers(List<Flower> flowers) {
		this.flowers = flowers;
	}
	*/
}
