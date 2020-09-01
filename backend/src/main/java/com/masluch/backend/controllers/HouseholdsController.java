package com.masluch.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masluch.backend.entities.Household;
import com.masluch.backend.services.HouseholdsService;

@RestController
@RequestMapping("/households")
@CrossOrigin
public class HouseholdsController {

	@Autowired
	private HouseholdsService householdsService;
	
	@GetMapping(path="/")
	public ResponseEntity<List<Household>> fetchAllHouseholds(){
		return householdsService.fetchAllHouseholds();
	}
	
	@GetMapping(path="/fetchHousehold")
	public ResponseEntity<Household> fetchHousehold(@RequestParam(name="householdId") Integer householdId)
	{
		return householdsService.fetchHousehold(householdId);
	}
	
	@GetMapping(path="/fetchOwnersHouseholds")
	public ResponseEntity<List<Household>> fetchOwnersHouseholds(@RequestParam(name="ownerId") Integer ownerId)
	{
		return householdsService.fetchOwnersHouseholds(ownerId);
	}
	
	@GetMapping(path="/fetchUserHouseholds")
	public ResponseEntity<List<Household>> fetchUserHouseholds(@RequestParam(name="userId") Integer userId)
	{
		return householdsService.fetchUserHouseholds(userId);
	}
}
