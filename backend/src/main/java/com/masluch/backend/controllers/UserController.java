package com.masluch.backend.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.masluch.backend.Requests.users.UserLoginData;
import com.masluch.backend.Requests.users.UserNewPassword;
import com.masluch.backend.entities.Photo;
import com.masluch.backend.entities.User;
import com.masluch.backend.services.PhotoService;
import com.masluch.backend.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private PhotoService photoService;
	
	@GetMapping("/")
	public List<User> getUsers(){
		return userService.findAll();
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User newUser){
		
		//System.out.println(newUser);
		
		return userService.registerUser(newUser);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> loginUser(@RequestBody UserLoginData userLoginData){
		//System.out.println(userLoginData);
		
		return userService.loginUser(userLoginData);
	}
	
	@PostMapping("/updateEmail")
	public ResponseEntity<User> updateUserEmail(@RequestBody User userData){
		
		return userService.updateEmail(userData);
	}
	
	@PostMapping("/updatePassword")
	public ResponseEntity<String> updateUserPassword(@RequestBody UserNewPassword userNewPassword){
		return userService.updatePassword(userNewPassword);
	}
	
	@PostMapping("/updateDescription")
	public ResponseEntity<User> updateUserDescription(@RequestBody User userData){
		return userService.updateDescription(userData);
	}
	
	@PostMapping(path = "/updateAvatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<User> updateUserAvatar(@RequestParam("file") MultipartFile file,
			@RequestParam Integer userId)
	{

		//System.out.println("[user controller] uploading user avatar");
		
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
		
		return userService.updateAvatar(userId, savedPhoto);
	}
}
