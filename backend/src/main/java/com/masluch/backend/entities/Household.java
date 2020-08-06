package com.masluch.backend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="household")
public class Household {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "household_id")
	private Integer householdId;
	
	@ManyToOne
	@JoinColumn(name="owner_id")
	private User owner;
	
	@Column(name="name")
	private String name;
	
	@Column(name = "description")
	private String description;
	
	@Column(name ="image")
	private String photo;

	public Integer getHouseholdId() {
		return householdId;
	}

	public void setHouseholdId(Integer householdId) {
		this.householdId = householdId;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
	
	
}
