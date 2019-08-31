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
import javax.persistence.OneToMany;

/**
 * @author Damian
 */
@Entity
public class Bouquet {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private UUID id;
	@Column
	private String name;
	@Column
	private double workPrice;
	@Column
	private double totalPrice;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Flower> flowers;

	
	public Bouquet(String name, double workPrice, double totalPrice, List<Flower> flowers) {
		super();
		this.name = name;
		this.workPrice = workPrice;
		this.totalPrice = totalPrice;
		this.flowers = flowers;
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
		return workPrice;
	}

	public void setWorkPrice(double workPrice) {
		this.workPrice = workPrice;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<Flower> getFlowers() {
		return flowers;
	}

	public void setFlowers(List<Flower> flowers) {
		this.flowers = flowers;
	}
	
	

}
