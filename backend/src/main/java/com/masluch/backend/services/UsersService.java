package com.masluch.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.masluch.backend.entities.User;

public interface UsersService {
	
	public ResponseEntity<User> fetchUser(Integer userId);

	public ResponseEntity<List<User>> fetchUsers();
	
	public ResponseEntity<List<User>> fetchUsersWithRegex(String regex);
	
	public ResponseEntity<List<User>> fetchHouseMates(Integer householdId);
	
	public ResponseEntity<List<User>> fetchFriends(Integer userId);
	
	public ResponseEntity<List<User>> fetchUsersRange(int start, int end);
	
}
