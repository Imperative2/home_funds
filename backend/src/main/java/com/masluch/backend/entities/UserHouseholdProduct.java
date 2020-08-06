package com.masluch.backend.entities;

import java.util.Date;
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
@Table(name="user_household_products")
public class UserHouseholdProduct {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "id")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="product_id")
	private HouseholdProduct product;
	
	@ManyToMany
	@JoinColumn(name="user_id")
	private List<User> user;
	
	@Column(name="date")
	private Date date;
	
	@Column(name="description")
	private String description;
	
	@Column(name="image")
	private String image;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public HouseholdProduct getProduct() {
		return product;
	}

	public void setProduct(HouseholdProduct product) {
		this.product = product;
	}

	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	
	
	
}
