package com.rodri.chatnorris.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rodri.chatnorris.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
	
	User findByUsername(String username);

	User findByToken(String token);

}
