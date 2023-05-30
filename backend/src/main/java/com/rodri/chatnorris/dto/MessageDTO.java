package com.rodri.chatnorris.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.rodri.chatnorris.entities.Message;

public class MessageDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String text;
	
	@NotNull(message = "Campo obrigatório")
	private boolean user;
	
	public MessageDTO() {}
	
	public MessageDTO(Message entity)
	{
		id = entity.getId();
		text = entity.getText();
		user = entity.isUser();
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}

	public boolean getUser() {
		return user;
	}
	
}
