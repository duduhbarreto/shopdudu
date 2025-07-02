package br.com.primeshoes.api.dtos;

import br.com.primeshoes.api.enuns.Role;
import java.time.LocalDateTime;

public record UserResponseDTO(
		long id,
		String name,
		String email, 
		Role role,
		LocalDateTime createdAt,
		LocalDateTime updatedAt
		) {}
