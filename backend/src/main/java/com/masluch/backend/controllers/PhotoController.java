package com.masluch.backend.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.masluch.backend.entities.Photo;
import com.masluch.backend.services.PhotoService;



@RestController
@RequestMapping("/photo")
@CrossOrigin
public class PhotoController {
	@Autowired
	private PhotoService photoService;

	@GetMapping(path = "/")
	public List<Photo> getAllPhotos()
	{
		return photoService.findAll();
	}

	@PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Photo> uploadToLocalFileSystem(@RequestParam("file") MultipartFile file,
			@RequestParam String type)
	{

		System.out.println(file);
		Photo newPhoto = new Photo();

		newPhoto.setPath("");
		newPhoto.setDate(new Date());

		Photo savedPhoto = photoService.save(newPhoto);

		String fileName = StringUtils.cleanPath(savedPhoto.getPhotoId() + ".png");
		Path path = Paths.get("..//Photos//" + fileName);
		try
			{
				System.out.println(path.toString());
				Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
			}
		catch (IOException e)
			{
				e.printStackTrace();
			}

		String fileDownloadUri = "/photo/download/" + fileName;

		savedPhoto.setPath(fileDownloadUri);
		photoService.update(savedPhoto);

		return new ResponseEntity<>(savedPhoto, HttpStatus.OK);

	}

	@GetMapping("/download/{fileName}")
	public ResponseEntity downloadFileFromLocal(@PathVariable String fileName)
	{
		System.out.println(fileName);
		Path path = Paths.get("..//Photos//" + fileName );
		Resource resource = null;
		try
			{
				resource = new UrlResource(path.toUri());
			}
		catch (MalformedURLException e)
			{
				e.printStackTrace();
			}
		return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG)
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
}
