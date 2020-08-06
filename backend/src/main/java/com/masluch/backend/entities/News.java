package com.masluch.backend.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "news")
public class News {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "news_id")
	private Integer newsId;
	
	@ManyToOne
	@JoinColumn(name="household_id")
	private Household household;
	
	@ManyToOne
	@JoinColumn(name="author_id")
	private User author;
	
	@Column(name="title")
	private String title;
	
	@Column(name="short_description")
	private String shortDescription;
	
	@Column(name="long_description")
	private String longDescription;
	
	@Column(name="date")
	private Date date;
	
	@ManyToOne
	@JoinColumn(name="type_id")
	private NewsType newsType;

	public Integer getNewsId() {
		return newsId;
	}

	public void setNewsId(Integer newsId) {
		this.newsId = newsId;
	}

	public Household getHousehold() {
		return household;
	}

	public void setHousehold(Household household) {
		this.household = household;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getShortDescription() {
		return shortDescription;
	}

	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	public String getLongDescription() {
		return longDescription;
	}

	public void setLongDescription(String longDescription) {
		this.longDescription = longDescription;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public NewsType getNewsType() {
		return newsType;
	}

	public void setNewsType(NewsType newsType) {
		this.newsType = newsType;
	}
	
	
}
