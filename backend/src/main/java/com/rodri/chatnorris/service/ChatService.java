package com.rodri.chatnorris.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rodri.chatnorris.dto.ChatDTO;
import com.rodri.chatnorris.entities.Chat;
import com.rodri.chatnorris.entities.User;
import com.rodri.chatnorris.repositories.ChatRepository;

@Service
public class ChatService {

	@Autowired
	ChatRepository chatRep;
	
	@Autowired
	AuthService authService;
	
	public List<ChatDTO> findByUserAuthenticated()
	{
		User user = authService.authenticated();
		List<Chat> chats = chatRep.findByUser(user);
		return chats.stream().map(c -> new ChatDTO(c)).toList();
	}
	
	public ChatDTO insert(ChatDTO dto)
	{
		User user = authService.authenticated(); 
		Chat entity = new Chat();
		entity.setTitle(dto.getTitle());
		entity.setUser(user);
		return new ChatDTO(chatRep.save(entity));
	}
}
