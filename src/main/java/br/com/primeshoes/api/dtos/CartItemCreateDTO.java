package br.com.primeshoes.api.dtos;

public record CartItemCreateDTO(
			int quantity,
			float subtotal,
			Long cartId,
			Long productVariationId
		) {}