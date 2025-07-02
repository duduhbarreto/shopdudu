package br.com.primeshoes.api.mappers;

import br.com.primeshoes.api.dtos.PromotionCreateDTO;
import br.com.primeshoes.api.dtos.PromotionResponseDTO;
import br.com.primeshoes.api.entities.Promotion;

public class PromotionMapper {

	public static Promotion toEntity(PromotionCreateDTO promotionCreateDTO) {
		Promotion promotion = new Promotion();
		promotion.setActive(promotionCreateDTO.isActive());
		promotion.setDiscountPercentage(promotionCreateDTO.discountPercentage());
		promotion.setEndDate(promotionCreateDTO.endDate());
		promotion.setName(promotionCreateDTO.name());
		promotion.setProductVariation(promotionCreateDTO.productVariation());
		promotion.setStartDate(promotionCreateDTO.startDate());
		
		
		return promotion;
	}
	
	public static PromotionResponseDTO toDTO(Promotion promotion) {
		
		PromotionResponseDTO cartResponse = new PromotionResponseDTO(promotion.getId(), promotion.getName(), promotion.getDiscountPercentage(), promotion.getStartDate(), promotion.getEndDate(), promotion.isActive(), promotion.getProductVariation());
		
		return cartResponse;
	}
	
}
