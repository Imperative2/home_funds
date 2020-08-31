package com.masluch.backend.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="household_users")
public class HouseholdUsers {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "id")
	private Integer id;
	
	
	@ManyToOne
	@JoinColumn(name="household_id")
	private Household household;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User householdUser;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Household getHousehold() {
		return household;
	}

	public void setHousehold(Household household) {
		this.household = household;
	}

	public User getHouseholdUser() {
		return householdUser;
	}

	public void setHouseholdUser(User householdUser) {
		this.householdUser = householdUser;
	}

	@Override
	public String toString() {
		return "HouseholdUsers [id=" + id + ", household=" + household + ", householdUser=" + householdUser + "]";
	}

	
}
