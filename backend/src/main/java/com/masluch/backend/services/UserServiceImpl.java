package com.masluch.backend.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.masluch.backend.DAO.UserDAO;
import com.masluch.backend.entities.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDAO userDAO;

	@Override
	@Transactional
	public List<User> findAll()
	{
		return userDAO.findAll();
	}

}
