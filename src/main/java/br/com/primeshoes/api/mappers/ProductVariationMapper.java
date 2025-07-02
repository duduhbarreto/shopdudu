package br.com.primeshoes.api.mappers;

import br.com.primeshoes.api.dtos.ProductVariationCreateDTO;
import br.com.primeshoes.api.dtos.ProductVariationResponseDTO;
import br.com.primeshoes.api.entities.ProductVariation;

public class ProductVariationMapper {

	public static ProductVariation toEntity(ProductVariationCreateDTO productVariationCreateDTO) {
		ProductVariation productVariation = new ProductVariation();
		productVariation.setColor(productVariationCreateDTO.color());
		productVariation.setSize(productVariationCreateDTO.size());
		productVariation.setStock(productVariationCreateDTO.stock());
				
		return productVariation;
	}
	
	public static ProductVariationResponseDTO toDTO(ProductVariation productVariation) {
		
		ProductVariationResponseDTO producVariationResponse = new ProductVariationResponseDTO(productVariation.getId(), productVariation.getColor(), productVariation.getSize(), productVariation.getStock(), ProductMapper.toDTO(productVariation.getProduct()));
		
		return producVariationResponse;
	}
}
