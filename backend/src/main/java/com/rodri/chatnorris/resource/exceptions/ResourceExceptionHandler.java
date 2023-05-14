package com.rodri.chatnorris.resource.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.rodri.chatnorris.service.exceptions.DataBaseException;
import com.rodri.chatnorris.service.exceptions.ForbiddenException;
import com.rodri.chatnorris.service.exceptions.ResourceNotFoundException;
import com.rodri.chatnorris.service.exceptions.UnauthorizedException;

@ControllerAdvice
public class ResourceExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(ResourceNotFoundException e, HttpServletRequest request)
	{
		HttpStatus status = HttpStatus.NOT_FOUND;
		StandardError error = new StandardError(Instant.now(),status.value(),"Resource not found",e.getMessage(),request.getRequestURI());
		return ResponseEntity.status(status).body(error);
	}
	
	@ExceptionHandler(DataBaseException.class)
	public ResponseEntity<StandardError> database(DataBaseException e, HttpServletRequest request)
	{
		HttpStatus status = HttpStatus.BAD_REQUEST;
		StandardError error = new StandardError(Instant.now(),status.value(),"Database exception",e.getMessage(),request.getRequestURI());
		return ResponseEntity.status(status).body(error);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<StandardError> validation(MethodArgumentNotValidException e, HttpServletRequest request)
	{
		HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
		ValidationError error = new ValidationError(Instant.now(),status.value(),"Validation exception",e.getMessage(),request.getRequestURI());
		e.getBindingResult().getFieldErrors().forEach(f -> error.addError(f.getField(), f.getDefaultMessage()));
		return ResponseEntity.status(status).body(error);
	}
	
	@ExceptionHandler(ForbiddenException.class)
	public ResponseEntity<OAuthCustomError> forbidden(ForbiddenException e, HttpServletRequest request)
	{
		HttpStatus status = HttpStatus.FORBIDDEN;
		OAuthCustomError error = new OAuthCustomError("Forbidden",e.getMessage());
		return ResponseEntity.status(status).body(error);
	}
	
	@ExceptionHandler(UnauthorizedException.class)
	public ResponseEntity<OAuthCustomError> unauthorized(UnauthorizedException e, HttpServletRequest request)
	{
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		OAuthCustomError error = new OAuthCustomError("Unauthorized",e.getMessage());
		return ResponseEntity.status(status).body(error);
	}
}
