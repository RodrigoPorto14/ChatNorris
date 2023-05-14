package com.rodri.chatnorris.dto;

import java.io.Serializable;

import com.rodri.chatnorris.entities.Chat;


public class ChatDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String title;
	
	public ChatDTO() {}
	
	public ChatDTO(Chat entity)
	{
		title = entity.getTitle();
		id = entity.getId();
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
}
