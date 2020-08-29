package com.masluch.backend.services;

import org.springframework.http.ResponseEntity;

import com.masluch.backend.Requests.users.NewHouseholdData;
import com.masluch.backend.entities.HouseholdProduct;

public interface HouseholdService {
	
	public ResponseEntity<String> createNewHousehold(NewHouseholdData newHouseholdData);
	
	public ResponseEntity<String> addHouseholdProduct(HouseholdProduct householdProduct, Integer householdId);
}
