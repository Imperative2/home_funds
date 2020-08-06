package com.masluch.backend.DAO;

import java.util.List;

import com.masluch.backend.entities.HouseholdProduct;


public interface HouseholdProductDAO {
	public List<HouseholdProduct> findAll();
	
	public HouseholdProduct findById(Integer householdProductId);
	
	public HouseholdProduct save(HouseholdProduct householdProduct);
	
	public void update(HouseholdProduct householdProduct);
	
	public void deleteById(Integer householdProductId);
}
