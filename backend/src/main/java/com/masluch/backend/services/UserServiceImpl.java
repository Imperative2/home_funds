package com.masluch.backend.services;

import java.util.List;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.masluch.backend.DAO.UserDAO;
import com.masluch.backend.DAO.UserDAOImpl;
import com.masluch.backend.Requests.users.UserLoginData;
import com.masluch.backend.Requests.users.UserNewPassword;
import com.masluch.backend.entities.Photo;
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
			////System.out.println("register 1");
			return new ResponseEntity<String>("Bad data", HttpStatus.BAD_REQUEST);
			
		}
		if(checkIfUserExistsByEmail(newUser.getEmail()) == true) {
			////System.out.println("register 2");
			return new ResponseEntity<String>("Email already registered", HttpStatus.BAD_REQUEST);
		}
		if(checkIfUserExistsByNickname(newUser.getNickname()) == true) {
			////System.out.println("register 3");
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

	@Transactional
	public ResponseEntity<User> loginUser(UserLoginData userLoginData) {
		if(userLoginData.getLogin() == null || UserValidation.checkIfEmailValid(userLoginData.getLogin()) != true) {
			////System.out.println("bad 1");
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		if(userLoginData.getPassword() != null) {
			if(UserValidation.checkIfPasswordValid(userLoginData.getPassword()) == false) {
				//System.out.println("bad 2");
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
						//System.out.println("bad 3");
						return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
					}

				}
			}
			
		}
		else if(userLoginData.getToken() != null) {
			//System.out.println("bad 4");
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}

		//System.out.println("bad 5");
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		

	}

	@Transactional
	public ResponseEntity<String> updatePassword(UserNewPassword userNewPassword) {
		
		if(UserValidation.checkIfPasswordValid(userNewPassword.getNewPassword()) == false) {
			//System.out.println("[update password] new password not valid");
			return new ResponseEntity<String>("New password not valid", HttpStatus.BAD_REQUEST);
		}
		
		User foundUser = userDAO.findById(userNewPassword.getUserId());
		if(foundUser == null) {
			//System.out.println("[update password] user not found");
			return new ResponseEntity<String>("Wrong data", HttpStatus.BAD_REQUEST);
		}
		
		if(passwordEncoder.matches(userNewPassword.getCurrentPassword(), foundUser.getPassword()) == false)
		{
			//System.out.println("[update password] wrong current password");
			return new ResponseEntity<String>("Wrong current password", HttpStatus.BAD_REQUEST);
		}
		
		foundUser.setPassword(passwordEncoder.encode(userNewPassword.getNewPassword()));
		
		userDAO.update(foundUser);
		
		return new ResponseEntity<String>("PasswordChanged", HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<User> updateEmail(User userData) {
		
		if(UserValidation.checkIfEmailValid(userData.getEmail()) == false) {
			//System.out.println("[user update email] wrong email");
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		
		User foundUser = userDAO.findById(userData.getUserId());
		if(foundUser == null)
		{
			//System.out.println("[user update email] user not found");
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		
		foundUser.setEmail(userData.getEmail());
		
		userDAO.update(foundUser);
		
		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<User> updateDescription(User userData) {
		
		User foundUser = userDAO.findById(userData.getUserId());
		if(foundUser == null)
		{
			//System.out.println("[user update description] user not found");
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		
		foundUser.setDescription(userData.getDescription());
		
		userDAO.update(foundUser);
		
		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<User> updateAvatar(Integer userId, Photo photo) {
		
		User foundUser = userDAO.findById(userId);
		if(foundUser == null)
		{
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		
		foundUser.setAvatar(photo);
		
		userDAO.update(foundUser);
		
		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
		
	}

	@Override
	public boolean checkIfUserExists(Integer userId) {
		User foundUser = userDAO.findById(userId);
		if(foundUser == null)
			return false;
		else 
			return true;
	}

}
