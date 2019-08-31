package com.dknapik.flowershop.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Flower {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private UUID id;
	@Column
	private String name;
	@Column
	private double price;
	
	public Flower(String name, double price) {
		super();
		this.name = name;
		this.price = price;
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
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}

	
	
}
