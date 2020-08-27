package com.masluch.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.masluch.backend.Requests.users.UserLoginData;
import com.masluch.backend.Requests.users.UserNewPassword;
import com.masluch.backend.entities.Photo;
import com.masluch.backend.entities.User;

public interface UserService
{
	public List<User> findAll();
	
	public ResponseEntity<String> registerUser(User newUser);
	
	public ResponseEntity<User> loginUser(UserLoginData userLoginData);
	
	public ResponseEntity<String> updatePassword(UserNewPassword userNewPassword);
	
	public ResponseEntity<User> updateEmail(User userData);
	
	public ResponseEntity<User> updateDescription(User userData);
	
	public ResponseEntity<User> updateAvatar(Integer userId, Photo photo);
	

}
