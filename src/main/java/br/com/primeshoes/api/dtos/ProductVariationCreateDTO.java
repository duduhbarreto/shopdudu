package br.com.primeshoes.api.dtos;

public record ProductVariationCreateDTO(
		String color,
		float size,
		int stock
		) {}
