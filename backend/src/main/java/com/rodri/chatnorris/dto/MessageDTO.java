package com.rodri.chatnorris.dto;

import java.io.Serializable;

import com.rodri.chatnorris.entities.Message;

public class MessageDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String text;
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
