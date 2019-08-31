package com.dknapik.flowershop.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * Represents user account in web application
 * 
 * @author Damian
 *
 */
@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	@Column(unique = true)
	private String userName;
	@Column
	private String password;
	@Column
	private String email;
	@Column
	private String role;
	

	public User(String password, String email, String role) {
		super();
		this.password = password;
		this.email = email;
		this.role = role;
	}

	public User(String userName, String password, String email, String role) {
		this.userName = userName;
		this.password = password;
		this.email = email;
		this.role = role;
	}
		
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

	
	
}
