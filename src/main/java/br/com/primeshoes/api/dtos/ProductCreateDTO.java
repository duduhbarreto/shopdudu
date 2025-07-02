package br.com.primeshoes.api.dtos;

import java.util.List;

public record ProductCreateDTO(
		String name,	
		String description,
		float price,
		long category_id,
		long brand_id,
		String imageUrl,
		float rating,
		List<ProductVariationCreateDTO> product_variation
		) {}