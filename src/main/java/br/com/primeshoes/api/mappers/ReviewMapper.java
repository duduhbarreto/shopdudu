package br.com.primeshoes.api.mappers;

import br.com.primeshoes.api.dtos.ReviewCreateDTO;
import br.com.primeshoes.api.dtos.ReviewResponseDTO;
import br.com.primeshoes.api.entities.Review;

public class ReviewMapper {

	public static Review toEntity(ReviewCreateDTO reviewCreateDTO) {
		Review review = new Review();
		review.setComment(reviewCreateDTO.comment());
		review.setProductVariation(reviewCreateDTO.productVariation());
		review.setRating(reviewCreateDTO.rating());
		review.setUser(reviewCreateDTO.user());
		
		return review;
	}
	
	public static ReviewResponseDTO toDTO(Review review) {
		
		ReviewResponseDTO cartResponse = new ReviewResponseDTO(review.getId(), review.getRating(), review.getComment(), review.getUser(), review.getProductVariation());
		
		return cartResponse;
	}	
}
