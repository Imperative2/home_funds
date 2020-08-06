package com.masluch.backend.DAO;

import java.util.List;

import com.masluch.backend.entities.NewsType;
import com.masluch.backend.entities.UserHouseholdProduct;

public interface UserHouseholdProductDAO {
	public List<UserHouseholdProduct> findAll();
	
	public UserHouseholdProduct findById(Integer userHouseholdProductId);
	
	public UserHouseholdProduct save(UserHouseholdProduct userHouseholdProduct);
	
	public void update(UserHouseholdProduct userHouseholdProduct);
	
	public void deleteById(Integer userHouseholdProductId);
}
