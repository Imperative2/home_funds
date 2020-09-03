package com.masluch.backend.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="household_product")
public class HouseholdProduct {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "product_id")
	private Integer productId;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="household_id")
	private Household household;
	
	@Column(name="name")
	private String name;
	
	@OneToMany
	@JoinColumn(name="product_id")
	private List<UserHouseholdProduct> userHouseholdProductList;

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Household getHousehold() {
		return household;
	}

	public void setHousehold(Household household) {
		this.household = household;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<UserHouseholdProduct> getUserHouseholdProductList() {
		return userHouseholdProductList;
	}

	public void setUserHouseholdProductList(List<UserHouseholdProduct> userHouseholdProductList) {
		this.userHouseholdProductList = userHouseholdProductList;
	}

	@Override
	public String toString() {
		return "HouseholdProduct [productId=" + productId + ", name=" + name
				+ ", userHouseholdProductList=" + userHouseholdProductList + "]";
	}


	
	
}
