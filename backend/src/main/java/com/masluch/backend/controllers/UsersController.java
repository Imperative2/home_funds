package com.masluch.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masluch.backend.entities.User;
import com.masluch.backend.services.UsersService;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UsersController {

	@Autowired
	private UsersService usersService;
	
	@GetMapping(path="/")
	private ResponseEntity<User> fetchUser(@RequestParam(name = "userId", required = true) Integer userId)
	{
		return usersService.fetchUser(userId);
	}
	
	@GetMapping(path = "/fetchUsers")
	private ResponseEntity<List<User>> fetchUsers(){
		return usersService.fetchUsers();
	}
	
	@GetMapping(path= "/fetchUsersWithRegex")
	private ResponseEntity<List<User>> fetchUsersWithRegex(@RequestParam(name="regex", required = true) String regex)
	{
		System.out.println(regex);
		return usersService.fetchUsersWithRegex(regex);
	}
	
	@GetMapping(path="/fetchUsersRange")
	private ResponseEntity<List<User>> fetchUsersRange(@RequestParam(name="start", required = true) Integer start, @RequestParam(name="end", required = true) Integer end)
	{
		return usersService.fetchUsersRange(start, end);
	}

}
