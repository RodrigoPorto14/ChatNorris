package com.rodri.chatnorris.resource;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rodri.chatnorris.dto.MessageDTO;
import com.rodri.chatnorris.dto.MessageInsertDTO;
import com.rodri.chatnorris.service.MessageService;

@RestController
@RequestMapping(value = "/messages")
public class MessageResource {

	@Autowired
	MessageService service;
	
	@GetMapping(value = "/{chatId}")
	public ResponseEntity<List<MessageDTO>> findByChat(@PathVariable Long chatId)
	{
		return ResponseEntity.ok().body(service.findByChat(chatId));
	}
	
	@PostMapping
	public ResponseEntity<MessageInsertDTO> insert(@RequestBody MessageInsertDTO dto)
	{
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
}
