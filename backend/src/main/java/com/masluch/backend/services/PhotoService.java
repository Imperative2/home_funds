package com.masluch.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.masluch.backend.entities.Photo;



public interface PhotoService {
	public List<Photo> findAll();
	
	public Photo findById(int photoId);
	
	public Photo save(Photo photo);
	
	public void update(Photo photo);
	
	public ResponseEntity<Photo> saveImage(Photo photo);
	
	public String getPhotoPath(Photo photo);
	
	public ResponseEntity<String> deleteById(int photoId);
}
