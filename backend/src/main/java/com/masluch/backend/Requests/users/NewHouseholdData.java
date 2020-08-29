package com.masluch.backend.Requests.users;

import java.util.List;

import com.masluch.backend.entities.Household;
import com.masluch.backend.entities.HouseholdProduct;
import com.masluch.backend.entities.HouseholdUsers;

public class NewHouseholdData {

	private Household household;
	
	private List<HouseholdProduct> householdProductsList;
	
	private HouseholdUsers householdUsers;

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

	public HouseholdUsers getHouseholdUsers() {
		return householdUsers;
	}

	public void setHouseholdUsers(HouseholdUsers householdUsers) {
		this.householdUsers = householdUsers;
	}

	@Override
	public String toString() {
		return "HouseholdCreateData [household=" + household + ", householdProductsList=" + householdProductsList
				+ ", householdUsers=" + householdUsers + "]";
	}
	
	
}
