package br.com.primeshoes.api.dtos;

import br.com.primeshoes.api.entities.ProductVariation;
import br.com.primeshoes.api.entities.User;

public record ReviewResponseDTO(
		long id,
		int rating,
		String comment,
		User user,
		ProductVariation productVariation
		) {}
