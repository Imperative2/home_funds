package com.masluch.backend.DAO;

import java.util.List;

import com.masluch.backend.entities.User;

public interface UserDAO {
	
	public List<User> findAll();
	
	public User findById(Integer userId);
	
	public List<User> findByEmail(String email);
	
	public List<User> findByNickname(String nickname);
	
	public User save(User user);
	
	public void update(User user);
	
	public void deleteById(Integer userId);
}
