package com.masluch.backend.DAO;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.masluch.backend.entities.Photo;

@Repository
public class PhotoDAOImpl implements PhotoDAO {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Photo> findAll() {
		Session session = entityManager.unwrap(Session.class);
		
		Query<Photo> query = session.createQuery("FROM Photo", Photo.class);
		List<Photo> result = query.getResultList();
		return result;
	}

	@Override
	public Photo findById(Integer photoId) {
		Session session = entityManager.unwrap(Session.class);
		Photo photo = session.get(Photo.class, photoId);
		return photo;
	}

	@Override
	public Photo save(Photo photo) {
		Session session = entityManager.unwrap(Session.class);
		session.save(photo);	
		return photo;
	}

	@Override
	public void update(Photo photo) {
		Session session = entityManager.unwrap(Session.class);
		session.update(photo);
	}

	@Override
	public void deleteById(Integer photoId) {
		Session session = entityManager.unwrap(Session.class);
		Photo photo = findById(photoId);
		session.delete(photo);
	}

}
