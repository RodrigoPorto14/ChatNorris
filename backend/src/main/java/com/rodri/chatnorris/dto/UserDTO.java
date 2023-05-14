package com.rodri.chatnorris.dto;

import com.rodri.chatnorris.entities.User;

public class UserDTO {
	
	private Long id;
	private String email;
	private String name;
	
	public UserDTO() {}
	
	public UserDTO(User entity)
	{
		id = entity.getId();
		email = entity.getEmail();
		name = entity.getName();
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}
	
	public String getName() {
		return name;
	}
	
}
