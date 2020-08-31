package com.masluch.backend.Requests.users;

import java.util.List;

import com.masluch.backend.entities.Household;
import com.masluch.backend.entities.HouseholdProduct;
import com.masluch.backend.entities.HouseholdUsers;
import com.masluch.backend.entities.User;

public class NewHouseholdData {

	private Household household;
	
	private List<HouseholdProduct> householdProductsList;
	
	private List<User> householdUsersList;

	public Household getHousehold() {
		return household;
	}

	public void setHousehold(Household household) {
		this.household = household;
	}

	public List<HouseholdProduct> getHouseholdProductsList() {
		return householdProductsList;
	}

	public void setHouseholdProductsList(List<HouseholdProduct> householdProductsList) {
		this.householdProductsList = householdProductsList;
	}

	public List<User> getHouseholdUsersList() {
		return householdUsersList;
	}

	public void setHouseholdUsersList(List<User> householdUsersList) {
		this.householdUsersList = householdUsersList;
	}

	@Override
	public String toString() {
		return "NewHouseholdData [household=" + household + ", householdProductsList=" + householdProductsList
				+ ", householdUsersList=" + householdUsersList + "]";
	}

	
	
	
}
