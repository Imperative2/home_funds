package com.masluch.backend.entities;

import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Table(name="household_product")
public class HouseholdProduct {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "product_id")
	private Integer productId;
	
	@ManyToOne
	@JoinColumn(name="household_id")
	private Household household;
	
	@Column(name="name")
	private String name;

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

	@Override
	public String toString() {
		return "HouseholdProduct [productId=" + productId + ", household=" + household + ", name=" + name + "]";
	}
	
	
	
}
