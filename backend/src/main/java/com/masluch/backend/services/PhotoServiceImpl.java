package com.masluch.backend.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.masluch.backend.DAO.PhotoDAO;
import com.masluch.backend.entities.Photo;

@Service
public class PhotoServiceImpl implements PhotoService {
	
	@Autowired
	PhotoDAO photoDAO;

	@Override
	public List<Photo> findAll() {
		return photoDAO.findAll();
	}

	@Override
	public Photo findById(int photoId) {
		return photoDAO.findById(photoId);
	}

	@Transactional
	public Photo save(Photo photo) {

		return photoDAO.save(photo);
	}

	@Transactional
	public void update(Photo photo) {
		 photoDAO.update(photo);

	}

	@Override
	public ResponseEntity<Photo> saveImage(Photo photo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPhotoPath(Photo photo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<String> deleteById(int photoId) {
		// TODO Auto-generated method stub
		return null;
	}

}
