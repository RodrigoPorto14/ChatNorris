package com.rodri.chatnorris.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.rodri.chatnorris.entities.Chat;


public class ChatDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String title;
	
	public ChatDTO() {}
	
	public ChatDTO(Long id, String title) {
		this.id = id;
		this.title = title;
	}

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
