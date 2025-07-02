package br.com.primeshoes.api.dtos;

import br.com.primeshoes.api.entities.Order;
import br.com.primeshoes.api.entities.ProductVariation;

public record OrderItemResponseDTO(
		long id,
		int quantity,
		float subtotal,
		Order order,
		ProductVariation productVariation
		) {}
