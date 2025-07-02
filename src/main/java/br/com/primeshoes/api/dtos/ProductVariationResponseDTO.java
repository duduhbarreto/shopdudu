package br.com.primeshoes.api.dtos;

public record ProductVariationResponseDTO(
		long id,
		String color,
		float size,
		int stock,
		ProductResponseDTO product
		) {}
