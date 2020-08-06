package com.masluch.backend.DAO;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.masluch.backend.entities.User;
import com.masluch.backend.entities.UserHouseholdProduct;

@Repository
public class UserHouseholdProductDAOImpl implements UserHouseholdProductDAO {

	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<UserHouseholdProduct> findAll() {
		Session session = entityManager.unwrap(Session.class);
		
		Query<UserHouseholdProduct> query = session.createQuery("FROM UserHouseholdProduct", UserHouseholdProduct.class);
		List<UserHouseholdProduct> result = query.getResultList();
		return result;
	}

	@Override
	public UserHouseholdProduct findById(Integer userHouseholdProductId) {
		Session session = entityManager.unwrap(Session.class);
		UserHouseholdProduct userHouseholdProduct = session.get(UserHouseholdProduct.class, userHouseholdProductId);
		return userHouseholdProduct;
	}

	@Override
	public UserHouseholdProduct save(UserHouseholdProduct userHouseholdProduct) {
		Session session = entityManager.unwrap(Session.class);
		session.save(userHouseholdProduct);	
		return userHouseholdProduct;
	}

	@Override
	public void update(UserHouseholdProduct userHouseholdProduct) {
		Session session = entityManager.unwrap(Session.class);
		session.update(userHouseholdProduct);

	}

	@Override
	public void deleteById(Integer userHouseholdProductId) {
		Session session = entityManager.unwrap(Session.class);

	}

}
