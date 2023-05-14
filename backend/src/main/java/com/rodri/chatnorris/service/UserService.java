package com.rodri.chatnorris.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.rodri.chatnorris.dto.UserDTO;
import com.rodri.chatnorris.entities.User;
import com.rodri.chatnorris.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRep;
	
	@Autowired
	private AuthService authService;
	
	public UserDTO getProfile()
	{
		User user = authService.authenticated();
		return new UserDTO(user);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRep.findByEmail(username);
		if(user == null) throw new UsernameNotFoundException("Email not found"); 
		return user;
	}
}
