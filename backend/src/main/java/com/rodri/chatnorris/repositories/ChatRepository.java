package com.rodri.chatnorris.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rodri.chatnorris.dto.ChatDTO;
import com.rodri.chatnorris.entities.Chat;
import com.rodri.chatnorris.entities.User;

public interface ChatRepository extends JpaRepository<Chat,Long>{
	
	@Query("SELECT new com.rodri.chatnorris.dto.ChatDTO(c.id,c.title) "
		 + "FROM Chat c "
		 + "INNER JOIN Message m ON c.id = m.chat "
		 + "WHERE c.user = :user AND m.createdAt = ( SELECT MAX(createdAt) FROM Message WHERE chat = c.id )"
		 + "ORDER BY m.createdAt DESC")
	List<ChatDTO> findByUser(User user);
	
	//List<ChatDTO> findByUser(User user);
}
