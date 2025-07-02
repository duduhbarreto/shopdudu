package br.com.primeshoes.api.dtos;

import java.time.LocalDateTime;


public record CartItemResponseDTO(
		long id,
		int quantity,
		float subtotal,
		CartResponseDTO cart,
		ProductVariationResponseDTO productVariation,
		LocalDateTime createdAt,
		LocalDateTime updatedAt
		) {}
