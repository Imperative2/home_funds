package com.masluch.backend.Requests.users;

public class UserLoginData {

	private String login;
	
	private String password;
	
	private String token;

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "UserLoginData [login=" + login + ", password=" + password + ", token=" + token + "]";
	}
	
	
}
