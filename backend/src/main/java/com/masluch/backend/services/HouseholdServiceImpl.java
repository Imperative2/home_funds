package com.masluch.backend.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import utils.validation.HouseholdValidation;

import com.masluch.backend.DAO.HouseholdDAO;
import com.masluch.backend.DAO.HouseholdProductDAO;
import com.masluch.backend.DAO.HouseholdUsersDAO;
import com.masluch.backend.DAO.UserDAO;
import com.masluch.backend.Requests.users.NewHouseholdData;
import com.masluch.backend.entities.Household;
import com.masluch.backend.entities.HouseholdProduct;
import com.masluch.backend.entities.HouseholdUsers;
import com.masluch.backend.entities.User;

@Service
public class HouseholdServiceImpl implements HouseholdService {
	
	@Autowired
	private HouseholdDAO householdDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired 
	private HouseholdProductDAO householdProductDAO;
	
	@Autowired
	private HouseholdUsersDAO householdUsersDAO;

	@Transactional
	public ResponseEntity<String> createNewHousehold(NewHouseholdData newHouseholdData) 
	{
		if(HouseholdValidation.checkIfCreateHouseholdDataValid(newHouseholdData) == false)
		{
			return new ResponseEntity<String>("Bad data", HttpStatus.BAD_REQUEST);
		}
		
		User foundOwner = userDAO.findById(newHouseholdData.getHousehold().getOwner().getUserId());
		if(foundOwner == null) {
			return new ResponseEntity<String>("Owner doesn't exist", HttpStatus.BAD_REQUEST);
		}
		
		Household newHousehold = new Household();
		newHousehold.setName(newHouseholdData.getHousehold().getName());
		newHousehold.setDescription(newHouseholdData.getHousehold().getDescription());
		newHousehold.setOwner(foundOwner);
		
		Household savedHousehold = householdDAO.save(newHousehold);
		
		for(HouseholdProduct householdProduct : newHouseholdData.getHouseholdProductsList())
		{
			addHouseholdProduct(householdProduct, savedHousehold);
		}
		

		for(User householdUser: newHouseholdData.getHouseholdUsersList())
		{
			User foundUser = userDAO.findById(householdUser.getUserId());
			if(foundUser != null)
			{
				
				
				HouseholdUsers newHouseholdUser = new HouseholdUsers();
				newHouseholdUser.setHousehold(savedHousehold);
				newHouseholdUser.setHouseholdUser(foundUser);
				householdUsersDAO.save(newHouseholdUser);
				
			}
			else
			{
				System.out.println("user not found in creating new household");
			}
		}
		

		
		
		
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	
	public boolean addHouseholdProduct(HouseholdProduct householdProduct, Household household) {
		
		HouseholdProduct newHouseholdProduct = new HouseholdProduct();
		newHouseholdProduct.setName(householdProduct.getName());
		newHouseholdProduct.setHousehold(household);
		HouseholdProduct savedHouseholdProduct = householdProductDAO.save(newHouseholdProduct);
		
		return true;
	}
	
	

	@Transactional
	public ResponseEntity<String> addHouseholdProduct(HouseholdProduct householdProduct, Integer householdId) {
		
		return null;
	}

}
