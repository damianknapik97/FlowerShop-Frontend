package com.dknapik.flowershop.api.viewmodel;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class AccountViewModel {
	@NotNull
	private String name;
	@NotNull
	@Min(8)
	private String password;
	@NotNull
	@Email
	private String email;
	
	private String role = "User";

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
