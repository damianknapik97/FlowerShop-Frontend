package com.dknapik.flowershop.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.javamoney.moneta.Money;


@Entity
public class Flower {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private UUID id;
	@Column
	private String name;
	@Column
	private String price;
	
	public Flower(String name, Money price) {
		super();
		this.name = name;
		this.price = price.toString();
		
	}
	
	public Flower() {
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
	public Money getPrice() {
		return Money.parse(this.price);
	}
	public void setPrice(Money price) {
		this.price = price.toString();
	}
	
}
