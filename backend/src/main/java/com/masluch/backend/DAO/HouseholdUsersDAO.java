package com.masluch.backend.DAO;

import java.util.List;

import com.masluch.backend.entities.Household;
import com.masluch.backend.entities.HouseholdUsers;
import com.masluch.backend.entities.User;


public interface HouseholdUsersDAO {

	public List<HouseholdUsers> findAll();
	
	public HouseholdUsers findById(Integer householdUsersId);
	
	public List<HouseholdUsers> findByUserAndHouseholdId(Integer householdId, Integer userId);
	
	public List<Household> findHouseholdsByUserId(Integer userId);
	
	public HouseholdUsers save(HouseholdUsers householdUsers);
	
	public void update(HouseholdUsers householdUsers);
	
	public void deleteById(Integer householdUsersId);
}
