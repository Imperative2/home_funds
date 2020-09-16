package com.masluch.backend.services;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.masluch.backend.DAO.HouseholdDAO;
import com.masluch.backend.DAO.HouseholdProductDAO;
import com.masluch.backend.DAO.HouseholdUsersDAO;
import com.masluch.backend.DAO.UserDAO;
import com.masluch.backend.DAO.UserHouseholdProductDAO;
import com.masluch.backend.Requests.users.NewHouseholdData;
import com.masluch.backend.Requests.users.NewUserHouseholdProductData;
import com.masluch.backend.entities.Household;
import com.masluch.backend.entities.HouseholdProduct;
import com.masluch.backend.entities.HouseholdUsers;
import com.masluch.backend.entities.User;
import com.masluch.backend.entities.UserHouseholdProduct;

import utils.validation.HouseholdValidation;

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
	
	@Autowired
	private UserHouseholdProductDAO userHouseholdProductDAO;

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
				newHouseholdUser.setUser(foundUser);
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
	public ResponseEntity<Household> addHouseholdProduct(HouseholdProduct householdProduct, Integer householdId) {
		Household foundHousehold = householdDAO.findById(householdId);
		if(foundHousehold == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		if(addHouseholdProduct(householdProduct, foundHousehold) == false){
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<Household>(foundHousehold, HttpStatus.OK);
	}


	@Transactional
	public ResponseEntity<Household> updateHouseholdDescription(Household householdData) {
		
		if(HouseholdValidation.checkIfDescriptionCorrect(householdData.getDescription()) == false)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		Household foundHousehold = householdDAO.findById(householdData.getHouseholdId());
		if(foundHousehold == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		foundHousehold.setDescription(householdData.getDescription());
		Household savedHousehold = householdDAO.save(foundHousehold);
		return new ResponseEntity<Household>(savedHousehold, HttpStatus.OK);
				
	}
	
	@Transactional
	public ResponseEntity<Household> updateHouseholdName(Household householdData) {

		if(HouseholdValidation.checkIfNameCorrect(householdData.getName()) == false)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		Household foundHousehold = householdDAO.findById(householdData.getHouseholdId());
		if(foundHousehold == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		foundHousehold.setName(householdData.getName());
		Household savedHousehold = householdDAO.save(foundHousehold);
		return new ResponseEntity<Household>(savedHousehold, HttpStatus.OK);
				
	}


	@Transactional
	public ResponseEntity<Household> addUserToHousehold(Integer householdId, Integer userId) {

		Household foundHousehold = householdDAO.findById(householdId);
		User foundUser = userDAO.findById(userId);
		if(foundUser == null || foundHousehold == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		List<HouseholdUsers> existingUsersList = householdUsersDAO.findByUserAndHouseholdId(householdId, userId);
		if(existingUsersList.size() != 0)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		HouseholdUsers newHouseholdUser = new HouseholdUsers();
		newHouseholdUser.setHousehold(foundHousehold);
		newHouseholdUser.setUser(foundUser);
		householdUsersDAO.save(newHouseholdUser);
		
		return new ResponseEntity<Household>(foundHousehold, HttpStatus.OK);
		
	}


	@Transactional
	public ResponseEntity<Household> removeUserFromHousehold(Integer householdId, Integer userId) {
		Household foundHousehold = householdDAO.findById(householdId);
		if(foundHousehold == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		List<HouseholdUsers> foundHouseholdUserList = householdUsersDAO.findByUserAndHouseholdId(householdId, userId);
		if(foundHouseholdUserList.size() == 0 || foundHouseholdUserList.size() > 1)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		householdUsersDAO.deleteById(foundHouseholdUserList.get(0).getId());
		
		return new ResponseEntity<Household>(foundHousehold, HttpStatus.OK);
		
	}


	@Transactional
	public ResponseEntity<Household> removeHouseholdProduct(Integer householdId, Integer householdProductId) {
		Household foundHousehold = householdDAO.findById(householdId);
		if(foundHousehold == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		HouseholdProduct foundHouseholdProduct = householdProductDAO.findById(householdProductId);
		if(foundHouseholdProduct == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		householdProductDAO.deleteById(householdProductId);
		
		return new ResponseEntity<Household>(foundHousehold, HttpStatus.OK);
				
	}


	@Override
	public ResponseEntity<String> removeHousehold(Integer householdId) {
		// TODO Auto-generated method stub
		return null;
	}


	@Transactional
	public ResponseEntity<Household> addUserHouseholdProduct(NewUserHouseholdProductData newUserHouseholdProductData) {
		
		HouseholdProduct foundProduct = householdProductDAO.findById(newUserHouseholdProductData.getProductId());
		if( foundProduct == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		Household foundHousehold  = foundProduct.getHousehold();
		User foundUser = getUserFromHousehold(newUserHouseholdProductData.getUserId(), foundHousehold);
		if(foundUser == null)
		{
			return new ResponseEntity<Household>(HttpStatus.BAD_REQUEST);
		}
		
		UserHouseholdProduct newUserHouseholdProduct = new UserHouseholdProduct();
		newUserHouseholdProduct.setUser(foundUser);
		newUserHouseholdProduct.setProduct(foundProduct);
		newUserHouseholdProduct.setDescription(newUserHouseholdProductData.getDescription());
		newUserHouseholdProduct.setDate(new Date());
		
		userHouseholdProductDAO.save(newUserHouseholdProduct);
		
		return new ResponseEntity<Household>(HttpStatus.OK);
	}
	
	public User getUserFromHousehold(Integer userId, Household household)
	{
		for(HouseholdUsers householdUser: household.getHouseholdUsers())
		{
			if(householdUser.getUser().getUserId() == userId)
			{
				return householdUser.getUser();
			}
		}
		return null;
	}




}
