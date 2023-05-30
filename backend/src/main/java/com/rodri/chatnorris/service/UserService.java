package com.rodri.chatnorris.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rodri.chatnorris.dto.UserDTO;
import com.rodri.chatnorris.dto.UserInsertDTO;
import com.rodri.chatnorris.entities.User;
import com.rodri.chatnorris.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRep;
	
	@Autowired
	private AuthService authService;
	
	@Transactional(readOnly=true)
	public UserDTO getProfile()
	{
		User user = authService.authenticated();
		return new UserDTO(user);
	}
	
	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		entity.setEmail(dto.getEmail());
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity.setName(dto.getName());
		userRep.save(entity);
		return new UserDTO(entity);		
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRep.findByEmail(email);
		if(user == null) 
			throw new UsernameNotFoundException("Email not found"); 
		return user;
	}
}
