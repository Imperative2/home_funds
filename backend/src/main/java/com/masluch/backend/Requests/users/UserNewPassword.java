package com.masluch.backend.Requests.users;

public class UserNewPassword {
	private Integer userId;
	
	private String currentPassword;
	
	private String newPassword;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getCurrentPassword() {
		return currentPassword;
	}

	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	@Override
	public String toString() {
		return "UserNewPassword [userId=" + userId + ", currentPassword=" + currentPassword + ", newPassword="
				+ newPassword + "]";
	}
	
	
}
