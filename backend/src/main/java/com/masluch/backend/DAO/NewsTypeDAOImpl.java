package com.masluch.backend.DAO;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.masluch.backend.entities.NewsType;


@Repository
public class NewsTypeDAOImpl implements NewsTypeDAO {

	@Autowired
	private EntityManager entityManager;

	
	
	@Override
	public List<NewsType> findAll() {
		Session session = entityManager.unwrap(Session.class);
		
		Query<NewsType> query = session.createQuery("FROM NewsType", NewsType.class);
		List<NewsType> result = query.getResultList();
		return result;
	}

	@Override
	public NewsType findById(Integer newsTypeId) {
		Session session = entityManager.unwrap(Session.class);
		NewsType newsType = session.get(NewsType.class, newsTypeId);
		return newsType;
	}

	@Override
	public NewsType save(NewsType newsType) {
		Session session = entityManager.unwrap(Session.class);
		session.save(newsType);	
		return newsType;
	}

	@Override
	public void update(NewsType newsType) {
		Session session = entityManager.unwrap(Session.class);
		session.update(newsType);
	}

	@Override
	public void deleteById(Integer newsTypeId) {
		Session session = entityManager.unwrap(Session.class);
		NewsType newsType = findById(newsTypeId);
		session.delete(newsType);
		
	}

}
