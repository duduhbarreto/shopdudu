package br.com.primeshoes.api.dtos;

import br.com.primeshoes.api.entities.Brand;
import br.com.primeshoes.api.entities.Category;

public record ProductResponseDTO(
		long id,
		String name,
		String description,
		float price,
		Category category,
		Brand brand,
		String imageUrl,
		float rating
		) {}
