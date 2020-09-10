package com.masluch.backend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "user_id")
	private Integer userId;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "surname")
	private String surname;
	
	@Column(name="nickname")
	private String nickname;
	
	@Column(name= "email")
	private String email;
	
	@Column(name= "password")
	@JsonIgnoreProperties(allowGetters = false, value = {"password"})
	private String password;
	
	@Column(name="description")
	private String description;
	
	@Column(name="color")
	private String color;
	
	@OneToOne(optional = true)
	@JoinColumn(name = "avatar" )
	private Photo avatar;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Photo getAvatar() {
		return avatar;
	}

	public void setAvatar(Photo avatar) {
		this.avatar = avatar;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", name=" + name + ", surname=" + surname + ", nickname=" + nickname + ", email="
				+ email + ", password=" + password + ", description=" + description + ", color=" + color + ", avatar="
				+ avatar + "]";
	}
	
	
	
}
