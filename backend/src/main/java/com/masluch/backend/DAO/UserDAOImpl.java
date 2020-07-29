package com.masluch.backend.DAO;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.masluch.backend.entities.User;

@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<User> findAll()
	{
		Session session = entityManager.unwrap(Session.class);
		
		Query<User> query = session.createQuery("FROM User", User.class);
		List<User> result = query.getResultList();
		return result;
	}

	@Override
	public User findById(Integer userId)
	{
		Session session = entityManager.unwrap(Session.class);
		User user = session.get(User.class, userId);
		return user;
	}

	@Override
	public List<User> findByEmail(String email)
	{
		Session session = entityManager.unwrap(Session.class);
		Query<User> query = session.createQuery("FROM User u WHERE u.email=:email",User.class);
		query.setParameter("email", email);
		List<User> userList = query.getResultList();
		return userList;
	}

	@Override
	public User save(User user)
	{
		Session session = entityManager.unwrap(Session.class);
		session.save(user);	
		return user;
	}

	@Override
	public void update(User user)
	{
		Session session = entityManager.unwrap(Session.class);
		session.update(user);
	}

	@Override
	public void deleteById(Integer userId)
	{
		Session session = entityManager.unwrap(Session.class);

	}


}
