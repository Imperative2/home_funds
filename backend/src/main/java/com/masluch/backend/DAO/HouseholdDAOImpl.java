package com.masluch.backend.DAO;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.masluch.backend.entities.Household;


@Repository
public class HouseholdDAOImpl implements HouseholdDAO {

	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<Household> findAll() {
		Session session = entityManager.unwrap(Session.class);
		
		Query<Household> query = session.createQuery("FROM Household", Household.class);
		List<Household> result = query.getResultList();
		return result;
	}

	@Override
	public Household findById(Integer householdId) {
		Session session = entityManager.unwrap(Session.class);
		Household household = session.get(Household.class, householdId);
		return household;
	}
	
	@Override
	public List<Household> findByOwnerId(Integer ownerId) {
		Session session = entityManager.unwrap(Session.class);
		Query<Household> query = session.createQuery("FROM Household as h WHERE h.owner.userId=:ownerId", Household.class);
		query.setParameter("ownerId",ownerId);
		List<Household> result = query.getResultList();
		return result;
	}


	@Override
	public Household save(Household household) {
		Session session = entityManager.unwrap(Session.class);
		session.save(household);	
		return household;
	}

	@Override
	public void update(Household household) {
		Session session = entityManager.unwrap(Session.class);
		session.update(household);

	}

	@Override
	public void deleteById(Integer householdId) {
		Session session = entityManager.unwrap(Session.class);

	}


}
