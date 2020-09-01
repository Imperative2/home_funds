package com.masluch.backend.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.masluch.backend.DAO.HouseholdDAO;
import com.masluch.backend.DAO.HouseholdUsersDAO;
import com.masluch.backend.DAO.UserDAO;
import com.masluch.backend.entities.Household;
import com.masluch.backend.entities.User;

@Service
public class HouseholdsServiceImpl implements HouseholdsService {
	
	@Autowired
	private HouseholdDAO householdDAO;
	
	@Autowired
	private HouseholdUsersDAO householdUsersDAO;
	
	@Autowired
	private UserDAO userDAO;
	

	@Transactional
	public ResponseEntity<List<Household>> fetchAllHouseholds()
	{
		List<Household> foundHouseholds = householdDAO.findAll();
		return new ResponseEntity<List<Household>>(foundHouseholds, HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<Household> fetchHousehold(Integer householdId) {
		Household foundHousehold = householdDAO.findById(householdId);
		if(foundHousehold == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<Household>(foundHousehold, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<List<Household>> fetchOwnersHouseholds(Integer ownerId) {
		User foundUser = userDAO.findById(ownerId);
		if(foundUser == null)
		{
			return new ResponseEntity<List<Household>>(HttpStatus.BAD_REQUEST);
		}
		List<Household> foundHouseholds = householdDAO.findByOwnerId(ownerId);
		return new ResponseEntity<List<Household>>(foundHouseholds, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<List<Household>> fetchUserHouseholds(Integer userId) {
		User foundUser = userDAO.findById(userId);
		if(foundUser == null)
		{
			return new ResponseEntity<List<Household>>(HttpStatus.BAD_REQUEST);
		}
		List<Household> foundUserHouseholds = householdUsersDAO.findHouseholdsByUserId(userId);
		return new ResponseEntity<List<Household>>(foundUserHouseholds, HttpStatus.OK);
	}



}
