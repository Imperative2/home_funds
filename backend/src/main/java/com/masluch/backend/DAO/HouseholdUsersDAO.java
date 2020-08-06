package com.masluch.backend.DAO;

import java.util.List;

import com.masluch.backend.entities.HouseholdUsers;


public interface HouseholdUsersDAO {

	public List<HouseholdUsers> findAll();
	
	public HouseholdUsers findById(Integer householdUsersId);
	
	public HouseholdUsers save(HouseholdUsers householdUsers);
	
	public void update(HouseholdUsers householdUsers);
	
	public void deleteById(Integer householdUsersId);
}
