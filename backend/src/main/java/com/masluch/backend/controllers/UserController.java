package com.masluch.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masluch.backend.Requests.users.UserLoginData;
import com.masluch.backend.Requests.users.UserNewPassword;
import com.masluch.backend.entities.User;
import com.masluch.backend.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	@Autowired
	private UserService userService;
	
	@GetMapping("/")
	public List<User> getUsers(){
		return userService.findAll();
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User newUser){
		
		System.out.println(newUser);
		
		return userService.registerUser(newUser);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> loginUser(@RequestBody UserLoginData userLoginData){
		System.out.println(userLoginData);
		
		return userService.loginUser(userLoginData);
	}
	
	@PostMapping("/updateEmail")
	public ResponseEntity<User> updateUserEmail(@RequestBody User userData){
		
		return userService.updateEmail(userData);
	}
	
	@PostMapping("/updatePassword")
	public ResponseEntity<String> updateUserPassword(@RequestBody UserNewPassword userNewPassword){
		return userService.updatePassword(userNewPassword);
	}
	
	@PostMapping("/updateDescription")
	public ResponseEntity<User> updateUserDescription(@RequestBody User userData){
		return userService.updateDescription(userData);
	}
}
