package com.rodri.chatnorris.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rodri.chatnorris.dto.UserDTO;
import com.rodri.chatnorris.service.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserResource {
	
	@Autowired
	private UserService service;
	
	@GetMapping
	public ResponseEntity<UserDTO> getProfile()
	{
		return ResponseEntity.ok().body(service.getProfile());
	}

}
