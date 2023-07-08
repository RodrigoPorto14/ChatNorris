package com.rodri.chatnorris.dto;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.rodri.chatnorris.entities.User;

public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	@Email(message = "Favor entrar um email válido")
	private String username;
	
	@NotBlank(message = "Campo obrigatório")
	private String nickname;
	
	public UserDTO() {}
	
	public UserDTO(User entity)
	{
		id = entity.getId();
		username = entity.getUsername_();
		nickname = entity.getNickname();
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}
	
	public String getNickname() {
		return nickname;
	}
	
}
