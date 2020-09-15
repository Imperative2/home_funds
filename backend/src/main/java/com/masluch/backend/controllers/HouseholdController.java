package com.masluch.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masluch.backend.Requests.users.NewHouseholdData;
import com.masluch.backend.Requests.users.NewUserHouseholdProductData;
import com.masluch.backend.entities.Household;
import com.masluch.backend.entities.HouseholdProduct;
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
	
	@PostMapping(path="/updateHouseholdDescription")
	public ResponseEntity<Household> updateHouseholdDescription(@RequestBody Household householdData)
	{
		return householdService.updateHouseholdDescription(householdData);
	}
	
	@PostMapping(path="/updateHouseholdName")
	public ResponseEntity<Household> updateHouseholdName(@RequestBody Household householdData)
	{
		return householdService.updateHouseholdName(householdData);
	}
	
	@PostMapping(path="/addUserToHousehold")
	public ResponseEntity<Household> addUserToHousehold(@RequestParam(name = "userId") Integer userId, @RequestParam(name="householdId") Integer householdId )
	{
		return householdService.addUserToHousehold(householdId, userId);
	}
	
	@DeleteMapping(path="/removeUserFromHousehold")
	public ResponseEntity<Household> removeUserFromHousehold(@RequestParam(name = "userId") Integer userId, @RequestParam(name="householdId") Integer householdId )
	{
		return null;
	}
	
	@PostMapping(path="/addHouseholdProduct")
	public ResponseEntity<Household> addHouseholdProduct(@RequestParam(name="householdId") Integer householdId, @RequestBody HouseholdProduct newHouseholdProduct)
	{
		System.out.println(newHouseholdProduct);
		return householdService.addHouseholdProduct(newHouseholdProduct, householdId);
	}
	
	@DeleteMapping(path="/removeHouseholdProduct")
	public ResponseEntity<Household> removeHouseholdProduct(@RequestParam(name="householdId") Integer householdId,@RequestParam(name="householdProductId") Integer householdProductId)
	{
		return null;
	}
	
	@DeleteMapping(path="/removeHousehold")
	public ResponseEntity<String> removeHousehold(@RequestParam(name="householdId") Integer householdId)
	{
		return null;
	}
	
	@PostMapping(path="/addUserHouseholdProduct")
 	public ResponseEntity<Household> addUserHouseholdProduct(@RequestBody NewUserHouseholdProductData newUserHouseholdProductData)
 	{
		return householdService.addUserHouseholdProduct(newUserHouseholdProductData);
 	}
}
