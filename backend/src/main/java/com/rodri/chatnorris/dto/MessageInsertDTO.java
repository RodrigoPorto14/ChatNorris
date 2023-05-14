package com.rodri.chatnorris.dto;

import java.time.Instant;

import com.rodri.chatnorris.entities.Message;

public class MessageInsertDTO extends MessageDTO {
	private static final long serialVersionUID = 1L;
	
	private Instant createdAt;
	private Long chatId;
	
	
	public MessageInsertDTO() {}
	
	public MessageInsertDTO(Message entity, Long chatId)
	{
		super(entity);
		createdAt = entity.getCreatedAt();
		this.chatId = chatId;
		
	}

	public Long getChatId() {
		return chatId;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}
	
}
