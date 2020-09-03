package com.masluch.backend.Requests.users;

import com.masluch.backend.entities.UserHouseholdProduct;

public class NewUserHouseholdProductData {

	private Integer userId;
	private Integer productId;
	private String description;
	
	
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "NewUserHouseholdProductData [userId=" + userId + ", productId=" + productId + ", description="
				+ description + "]";
	}
	
	
}
