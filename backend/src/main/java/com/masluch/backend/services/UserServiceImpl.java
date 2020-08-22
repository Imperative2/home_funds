package com.masluch.backend.services;

import java.util.List;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.masluch.backend.DAO.UserDAO;
import com.masluch.backend.entities.User;

import utils.validation.UserValidation;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	

	@Override
	@Transactional
	public List<User> findAll()
	{
		return userDAO.findAll();
	}

	@Override
	@Transactional
	public ResponseEntity<String> registerUser(User newUser) {
		
		if(UserValidation.checkIfRegisterDataValid(newUser) == false) {
			return new ResponseEntity<String>("Bad data", HttpStatus.BAD_REQUEST);
		}
		if(checkIfUserExistsByEmail(newUser.getEmail()) == true) {
			return new ResponseEntity<String>("Email already registered", HttpStatus.BAD_REQUEST);
		}
		if(checkIfUserExistsByNickname(newUser.getNickname()) == true) {
			return new ResponseEntity<String>("Nickname already registered", HttpStatus.BAD_REQUEST);
		}
		
		newUser.setDescription("");
		newUser.setAvatar(null);
		newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
		
		User savedUser = userDAO.save(newUser);
		
		
		return new ResponseEntity<String>("OK", HttpStatus.OK);
	}
	
	public boolean checkIfUserExistsByEmail(String email) {
		List<User> foundUsers = userDAO.findByEmail(email);
		if(foundUsers.size() != 0)
		{
			return true;
		}
		else
			return false;
	}
	
	public boolean checkIfUserExistsByNickname(String nickname) {
		List<User> foundUsers = userDAO.findByNickname(nickname);
		if(foundUsers.size() != 0)
			return true;
		else
			return false;
	}

}
