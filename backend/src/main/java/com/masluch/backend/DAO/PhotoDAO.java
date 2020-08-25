package com.masluch.backend.DAO;

import java.util.List;

import com.masluch.backend.entities.Photo;


public interface PhotoDAO {
	public List<Photo> findAll();
	
	public Photo findById(Integer photoId);
	
	public Photo save(Photo photo);
	
	public void update(Photo photo);
	
	public void deleteById(Integer photoId);
}
