package com.masluch.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
