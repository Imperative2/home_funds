package com.masluch.backend.DAO;

import java.util.List;

import com.masluch.backend.entities.News;


public interface NewsDAO {
	public List<News> findAll();
	
	public News findById(Integer newsId);
	
	public News save(News news);
	
	public void update(News news);
	
	public void deleteById(Integer newsId);
}
