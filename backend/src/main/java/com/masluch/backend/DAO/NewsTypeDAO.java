package com.masluch.backend.DAO;

import java.util.List;

import com.masluch.backend.entities.NewsType;


public interface NewsTypeDAO {
	public List<NewsType> findAll();
	
	public NewsType findById(Integer newsTypeId);
	
	public NewsType save(NewsType newsType);
	
	public void update(NewsType newsType);
	
	public void deleteById(Integer newsTypeId);
}
