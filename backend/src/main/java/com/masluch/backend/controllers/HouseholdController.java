package com.masluch.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masluch.backend.Requests.users.NewHouseholdData;
import com.masluch.backend.services.HouseholdService;

@RestController
@RequestMapping("/household")
@CrossOrigin
public class HouseholdController {

	@Autowired
	private HouseholdService householdService;
	
	@PostMapping(path ="/createNewHousehold")
	public ResponseEntity<String> createNewHousehold(@RequestBody NewHouseholdData newHouseholdData)
	{
		System.out.println(newHouseholdData);
		return householdService.createNewHousehold(newHouseholdData);
	}
}
