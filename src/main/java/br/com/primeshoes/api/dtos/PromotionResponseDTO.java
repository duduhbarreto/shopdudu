package br.com.primeshoes.api.dtos;

import java.sql.Date;

import br.com.primeshoes.api.entities.ProductVariation;

public record PromotionResponseDTO(
		long id,
		String name,
		float discountPercentage,
		Date startDate,
		Date endDate,
		boolean isActive,
		ProductVariation productVariation
		) {}
