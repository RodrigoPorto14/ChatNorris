package com.rodri.chatnorris.service;

import java.time.Instant;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rodri.chatnorris.dto.MessageDTO;
import com.rodri.chatnorris.dto.MessageInsertDTO;
import com.rodri.chatnorris.entities.Chat;
import com.rodri.chatnorris.entities.Message;
import com.rodri.chatnorris.entities.User;
import com.rodri.chatnorris.repositories.ChatRepository;
import com.rodri.chatnorris.repositories.MessageRepository;
import com.rodri.chatnorris.service.exceptions.ForbiddenException;
import com.rodri.chatnorris.service.exceptions.ResourceNotFoundException;

@Service
public class MessageService {
	
	@Autowired
	MessageRepository messageRep;
	
	@Autowired
	ChatRepository chatRep;
	
	@Autowired
	AuthService authService;
	
	
	public List<MessageDTO> findByChat(Long chatId)
	{
		User user = authService.authenticated();
		//Chat chat = chatRep.getReferenceById(chatId);
		Chat chat = chatRep.findById(chatId).orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		
		if(!user.equals(chat.getUser())) throw new ForbiddenException("Access denied");
	
		//List<Message> messages = chat.getMessages();
		List<Message> messages = messageRep.findByChat(chat);
		return messages.stream().map(m -> new MessageDTO(m)).toList();
	}
	
	public MessageInsertDTO insert(MessageInsertDTO dto)
	{
		try
		{
			Chat chat = chatRep.getReferenceById(dto.getChatId());
			Message entity = new Message();
			entity.setText(dto.getText());
			entity.setUser(dto.getUser());
			entity.setCreatedAt(Instant.now());
			entity.setChat(chat);
			return new MessageInsertDTO(messageRep.save(entity),dto.getChatId());
		}
		catch(EntityNotFoundException e) { throw new ResourceNotFoundException("Id not found " + dto.getChatId()); }
	}
}
