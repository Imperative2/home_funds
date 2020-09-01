package com.masluch.backend.DAO;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.masluch.backend.entities.HouseholdUsers;
import com.masluch.backend.entities.User;

@Repository
public class HouseholdUsersDAOImpl implements HouseholdUsersDAO {

	@Autowired
	private EntityManager entityManager;
	
	
	public List<HouseholdUsers> findAll() {
		Session session = entityManager.unwrap(Session.class);
		
		Query<HouseholdUsers> query = session.createQuery("FROM HouseholdUsers", HouseholdUsers.class);
		List<HouseholdUsers> result = query.getResultList();
		return result;
	}

	@Override
	public HouseholdUsers findById(Integer householdUsersId) {
		Session session = entityManager.unwrap(Session.class);
		HouseholdUsers householdUsers = session.get(HouseholdUsers.class, householdUsersId);
		return householdUsers;
	}
	
	@Override
	public List<HouseholdUsers> findByUserId(Integer householdId, Integer userId) {
		Session session = entityManager.unwrap(Session.class);
		Query<HouseholdUsers> query = session.createQuery("FROM HouseholdUsers as hu WHERE hu.household.householdId=:householdId AND hu.householdUser.userId=:userId", HouseholdUsers.class);
		query.setParameter("householdId", householdId);
		query.setParameter("userId", userId);

		List<HouseholdUsers> result = query.getResultList();
		return result;
	}

	@Override
	public HouseholdUsers save(HouseholdUsers householdUsers) {
		Session session = entityManager.unwrap(Session.class);
		session.save(householdUsers);	
		return householdUsers;
	}

	@Override
	public void update(HouseholdUsers householdUsers) {
		Session session = entityManager.unwrap(Session.class);
		session.update(householdUsers);

	}

	@Override
	public void deleteById(Integer householdUsersId) {
		Session session = entityManager.unwrap(Session.class);


	}



}
