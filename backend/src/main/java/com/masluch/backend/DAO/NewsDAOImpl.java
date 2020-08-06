package com.masluch.backend.DAO;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.masluch.backend.entities.News;
import com.masluch.backend.entities.User;

@Repository
public class NewsDAOImpl implements NewsDAO {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public List<News> findAll() {
		Session session = entityManager.unwrap(Session.class);
		
		Query<News> query = session.createQuery("FROM News", News.class);
		List<News> result = query.getResultList();
		return result;
	}

	@Override
	public News findById(Integer newsId) {
		Session session = entityManager.unwrap(Session.class);
		News news = session.get(News.class, newsId);
		return news;
	}

	@Override
	public News save(News news) {
		Session session = entityManager.unwrap(Session.class);
		session.save(news);	
		return news;
	}

	@Override
	public void update(News news) {
		Session session = entityManager.unwrap(Session.class);
		session.update(news);
	}

	@Override
	public void deleteById(Integer newsId) {
		Session session = entityManager.unwrap(Session.class);
		
	}
	

}
