package com.masluch.backend.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.masluch.backend.DAO.UserDAO;
import com.masluch.backend.entities.User;

@Service
public class UsersServiceImpl implements UsersService {
	
	@Autowired
	private UserDAO userDAO;

	@Override
	public ResponseEntity<User> fetchUser(Integer userId) {
		User foundUser = userDAO.findById(userId);
		if(foundUser == null) {
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<User>(foundUser, HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<List<User>> fetchUsers() {
		List<User> foundUsers = userDAO.findAll();
		return new ResponseEntity<List<User>>(foundUsers, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<List<User>> fetchUsersWithRegex(String regex) {
		List<User> foundUsers = userDAO.findAll();
		List<User> matchingUsersList = new ArrayList<>();
		for(User user: foundUsers)
		{
			
			String combinedFields = user.getName()+" "+user.getSurname()+" "+user.getEmail()+" "+user.getNickname();
			
			if(combinedFields.matches(regex) == true)
			{
				matchingUsersList.add(user);
				continue;
			}
//			if(user.getName().matches(regex) == true)
//			{
//				matchingUsersList.add(user);
//				continue;
//			}
//			if(user.getSurname().matches(regex) == true)
//			{
//				matchingUsersList.add(user);
//				continue;
//			}
//			if(user.getEmail().matches(regex) == true)
//			{
//				matchingUsersList.add(user);
//				continue;
//			}
//			if(user.getNickname().matches(regex) == true)
//			{
//				matchingUsersList.add(user);
//				continue;
//			}
		}
		
		System.out.println(matchingUsersList.toString());
		
		return new ResponseEntity<List<User>>(matchingUsersList, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<List<User>> fetchHouseMates(Integer householdId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<List<User>> fetchFriends(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<List<User>> fetchUsersRange(int start, int end) {
		List<User> foundUsers = userDAO.findAll();
		if(start >= foundUsers.size() || start>end || start<0 || end<0)
		{
			return new ResponseEntity<List<User>>(HttpStatus.BAD_REQUEST);
		}
		if(end >= (foundUsers.size()))
		{
			end = foundUsers.size();
		}
		
		List<User> userRangeList = foundUsers.subList(start, end);
		
		return new ResponseEntity<List<User>>(userRangeList, HttpStatus.OK);
	}

}
