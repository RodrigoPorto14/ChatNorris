package com.rodri.chatnorris.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rodri.chatnorris.entities.Chat;
import com.rodri.chatnorris.entities.User;

public interface ChatRepository extends JpaRepository<Chat,Long>{
	
	List<Chat> findByUser(User user);
}
