package com.masluch.backend.services;

import java.util.List;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.masluch.backend.DAO.UserDAO;
import com.masluch.backend.DAO.UserDAOImpl;
import com.masluch.backend.Requests.UserLoginData;
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
			System.out.println("register 1");
			return new ResponseEntity<String>("Bad data", HttpStatus.BAD_REQUEST);
			
		}
		if(checkIfUserExistsByEmail(newUser.getEmail()) == true) {
			System.out.println("register 2");
			return new ResponseEntity<String>("Email already registered", HttpStatus.BAD_REQUEST);
		}
		if(checkIfUserExistsByNickname(newUser.getNickname()) == true) {
			System.out.println("register 3");
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

	@Override
	public ResponseEntity<User> loginUser(UserLoginData userLoginData) {
		if(userLoginData.getLogin() == null || UserValidation.checkIfEmailValid(userLoginData.getLogin()) != true) {
			System.out.println("bad 1");
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		if(userLoginData.getPassword() != null) {
			if(UserValidation.checkIfPasswordValid(userLoginData.getPassword()) == false) {
				System.out.println("bad 2");
				return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
			}
			else {
				List<User> foundUsers = userDAO.findByEmail(userLoginData.getLogin());
				if(foundUsers.size() > 0 && foundUsers.size()< 2) {
					User foundUser = foundUsers.get(0);

					if(passwordEncoder.matches(userLoginData.getPassword(), foundUser.getPassword()) == true) {
						return new ResponseEntity<User>(foundUser, HttpStatus.OK);
					}
					else {
						System.out.println("bad 3");
						return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
					}

				}
			}
			
		}
		else if(userLoginData.getToken() != null) {
			System.out.println("bad 4");
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}

		System.out.println("bad 5");
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		

	}

}
