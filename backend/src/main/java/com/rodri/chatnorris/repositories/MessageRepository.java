package com.rodri.chatnorris.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rodri.chatnorris.entities.Chat;
import com.rodri.chatnorris.entities.Message;

public interface MessageRepository extends JpaRepository<Message,Long>{
	
	List<Message> findByChatOrderByCreatedAt(Chat chat);
}
