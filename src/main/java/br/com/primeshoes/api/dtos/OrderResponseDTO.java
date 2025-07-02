package br.com.primeshoes.api.dtos;

import br.com.primeshoes.api.enuns.OrderStatus;
import java.time.LocalDateTime;

public record OrderResponseDTO(
			long id, 
			UserResponseDTO user,
			float totalPrice,
			OrderStatus status,
			String trackingCode,
			LocalDateTime createdAt,
			LocalDateTime updatedAt
		) {}
