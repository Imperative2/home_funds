package com.masluch.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.masluch.backend.entities.Household;

public interface HouseholdsService {

	public ResponseEntity<List<Household>> fetchAllHouseholds();
	
	public ResponseEntity<Household> fetchHousehold(Integer householdId);
	
	public ResponseEntity<List<Household>> fetchOwnersHouseholds(Integer ownerId);
	
	public ResponseEntity<List<Household>> fetchUserHouseholds(Integer userId);
}
