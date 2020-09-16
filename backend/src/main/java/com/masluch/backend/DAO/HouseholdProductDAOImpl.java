package com.masluch.backend.DAO;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.masluch.backend.entities.HouseholdProduct;


@Repository
public class HouseholdProductDAOImpl implements HouseholdProductDAO {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public List<HouseholdProduct> findAll() {
		Session session = entityManager.unwrap(Session.class);
		
		Query<HouseholdProduct> query = session.createQuery("FROM HouseholdProduct", HouseholdProduct.class);
		List<HouseholdProduct> result = query.getResultList();
		return result;
	}

	@Override
	public HouseholdProduct findById(Integer householdProductId) {
		Session session = entityManager.unwrap(Session.class);
		HouseholdProduct householdProduct = session.get(HouseholdProduct.class, householdProductId);
		return householdProduct;
	}

	@Override
	public HouseholdProduct save(HouseholdProduct householdProduct) {
		Session session = entityManager.unwrap(Session.class);
		session.save(householdProduct);	
		return householdProduct;
	}

	@Override
	public void update(HouseholdProduct householdProduct) {
		Session session = entityManager.unwrap(Session.class);
		session.update(householdProduct);

	}

	@Override
	public void deleteById(Integer householdProductId) {
		Session session = entityManager.unwrap(Session.class);
		HouseholdProduct householdProduct = session.get(HouseholdProduct.class, householdProductId);
		session.delete(householdProduct);
	}

}
