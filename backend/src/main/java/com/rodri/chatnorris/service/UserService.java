package com.rodri.chatnorris.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rodri.chatnorris.components.JwtUtil;
import com.rodri.chatnorris.dto.UserDTO;
import com.rodri.chatnorris.dto.UserInsertDTO;
import com.rodri.chatnorris.entities.User;
import com.rodri.chatnorris.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRep;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
    private JwtUtil jwtUtil;
	
	@Autowired
	EmailService emailService;
	
	@Value("${base.url}")
	private String baseUrl;
	
	@Transactional(readOnly=true)
	public UserDTO getProfile()
	{
		User user = authService.authenticated();
		return new UserDTO(user);
	}
	
	@Transactional
	public UserDTO insert(UserInsertDTO dto) 
	{
		User entity = new User();
		entity.setUsername(dto.getUsername());
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity.setNickname(dto.getNickname());
		entity.setActive(false);
		userRep.save(entity);
		
		User user = userRep.findByUsername(dto.getUsername());
		String token = jwtUtil.generateToken(user.getId());
		user.setToken(token);

		String verificationLink = baseUrl + "/users/verify?token=" + token;
        String subject = "Verificação de Registro ChatNorris";
        String message = "Por favor, clique no link abaixo para verificar seu registro:\n\n" + verificationLink;
        emailService.sendEmail(user.getUsername(), subject, message);
        
		userRep.save(user);
		return new UserDTO(user);		
	}
	
	@Transactional
	public String verifyUser(String token) 
	{
		User user = userRep.findByToken(token);
		
		if(user == null)
			return "Token inválido ou expirado";
        
		user.setActive(true);
		userRep.save(user);
		return "Verificação concluída com sucesso";
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException 
	{
		User user = userRep.findByUsername(username);
		
		if(user == null) 
			throw new UsernameNotFoundException("Email not found");
		
		return user;
	}

	
}
