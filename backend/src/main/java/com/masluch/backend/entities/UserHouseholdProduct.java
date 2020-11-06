package com.masluch.backend.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="user_household_products")
public class UserHouseholdProduct {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "id")
	private Integer id;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="product_id")
	private HouseholdProduct product;
	
	@JsonIgnoreProperties(value = {"name","surname","nickname","email","description","color","avatar"})
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@Column(name="date")
	private Date date;
	
	@Column(name="description")
	private String description;
	
	@OneToOne(optional = true)
	@JoinColumn(name = "photo" )
	private Photo photo;

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
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

	public Photo getPhoto() {
		return photo;
	}

	public void setPhoto(Photo photo) {
		this.photo = photo;
	}

	@Override
	public String toString() {
		return "UserHouseholdProduct [id=" + id + ", product=" + product + ", user=" + user + ", date=" + date
				+ ", description=" + description + ", photo=" + photo + "]";
	}

	
	
	
}
