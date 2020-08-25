package com.masluch.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.masluch.backend.Requests.UserLoginData;
import com.masluch.backend.entities.User;

public interface UserService
{
	public List<User> findAll();
	
	public ResponseEntity<String> registerUser(User newUser);
	
	public ResponseEntity<User> loginUser(UserLoginData userLoginData);
	

}
