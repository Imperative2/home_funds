package com.masluch.backend.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.masluch.backend.Requests.users.NewHouseholdData;
import com.masluch.backend.Requests.users.NewUserHouseholdProductData;
import com.masluch.backend.entities.Household;
import com.masluch.backend.entities.HouseholdProduct;
import com.masluch.backend.entities.Photo;
import com.masluch.backend.entities.User;
import com.masluch.backend.services.HouseholdService;
import com.masluch.backend.services.PhotoService;

@RestController
@RequestMapping("/household")
@CrossOrigin
public class HouseholdController {

	@Autowired
	private HouseholdService householdService;
	
	@Autowired
	private PhotoService photoService;
	
	@PostMapping(path ="/createNewHousehold")
	public ResponseEntity<Household> createNewHousehold(@RequestBody NewHouseholdData newHouseholdData)
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
		return householdService.removeUserFromHousehold(householdId, userId);
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
		return householdService.removeHouseholdProduct(householdId, householdProductId);
	}
	
	@DeleteMapping(path="/removeHousehold")
	public ResponseEntity<String> removeHousehold(@RequestParam(name="householdId") Integer householdId)
	{
		return householdService.removeHousehold(householdId);
	}
	
	@PostMapping(path="/addUserHouseholdProduct")
 	public ResponseEntity<Household> addUserHouseholdProduct(@RequestBody NewUserHouseholdProductData newUserHouseholdProductData)
 	{
		return householdService.addUserHouseholdProduct(newUserHouseholdProductData);
 	}
	
	@PostMapping(path = "/uploadHouseholdPhoto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Household> updateUserAvatar(@RequestParam("file") MultipartFile file,
			@RequestParam Integer householdId)
	{
		
		System.out.println("creating new household photo");

		
		Photo newPhoto = new Photo();

		newPhoto.setPath("");
		newPhoto.setDate(new Date());

		Photo savedPhoto = photoService.save(newPhoto);

		String fileName = StringUtils.cleanPath(savedPhoto.getPhotoId() + ".png");
		Path path = Paths.get("..//Photos//" + fileName);
		try
			{
				Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
			}
		catch (IOException e)
			{
				e.printStackTrace();
			}

		String fileDownloadUri = "/photo/download/" + fileName;

		savedPhoto.setPath(fileDownloadUri);
		photoService.update(savedPhoto);
		
		return householdService.uploadHouseholdPhoto(householdId, savedPhoto);
	}
}
