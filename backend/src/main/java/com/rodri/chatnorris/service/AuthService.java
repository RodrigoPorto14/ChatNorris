package com.rodri.chatnorris.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rodri.chatnorris.entities.User;
import com.rodri.chatnorris.repositories.UserRepository;
import com.rodri.chatnorris.service.exceptions.UnauthorizedException;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRep;
	
	@Transactional(readOnly = true)
	public User authenticated()
	{
		try
		{
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			return userRep.findByEmail(username);
		}
		catch(Exception e) { throw new UnauthorizedException("Invalid user"); }
	}
}
