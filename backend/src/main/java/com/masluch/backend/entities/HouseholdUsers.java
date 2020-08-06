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
	
	@ManyToMany
	@JoinColumn(name="user_id")
	private List<User> users;

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

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
	
	
}
