package com.masluch.backend.services;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.masluch.backend.Requests.users.NewHouseholdData;
import com.masluch.backend.Requests.users.NewUserHouseholdProductData;
import com.masluch.backend.entities.Household;
import com.masluch.backend.entities.HouseholdProduct;

public interface HouseholdService {
	
	public ResponseEntity<String> createNewHousehold(NewHouseholdData newHouseholdData);
	
	public ResponseEntity<Household> updateHouseholdDescription(Household householdData);
	
	public ResponseEntity<Household> updateHouseholdName(Household householdData);

	public ResponseEntity<Household> addUserToHousehold(Integer householdId, Integer userId);
	
	public ResponseEntity<Household> removeUserFromHousehold(Integer householdId, Integer userId);
	
	public ResponseEntity<Household> addHouseholdProduct(HouseholdProduct householdProduct, Integer householdId);

	public ResponseEntity<Household> removeHouseholdProduct(Integer householdId, Integer householdProductId);
	
	public ResponseEntity<String> removeHousehold(Integer householdId);
	
	ResponseEntity<Household> addUserHouseholdProduct(NewUserHouseholdProductData newUserHouseholdProductData);













}
