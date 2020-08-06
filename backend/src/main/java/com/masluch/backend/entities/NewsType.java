package com.masluch.backend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="news_type")
public class NewsType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "type_id")
	private Integer typeId;
	
	@Column(name="value")
	private String value;

	public Integer getTypeId() {
		return typeId;
	}

	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	
}
