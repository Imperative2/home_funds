package com.masluch.backend.DAO;

import java.util.List;

import com.masluch.backend.entities.Household;


public interface HouseholdDAO {
	public List<Household> findAll();
	
	public Household findById(Integer householdId);
	
	public Household save(Household household);
	
	public void update(Household household);
	
	public void deleteById(Integer householdId);
}
