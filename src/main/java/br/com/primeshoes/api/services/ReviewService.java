package br.com.primeshoes.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.ReviewCreateDTO;
import br.com.primeshoes.api.dtos.ReviewResponseDTO;
import br.com.primeshoes.api.entities.Review;
import br.com.primeshoes.api.mappers.ReviewMapper;
import br.com.primeshoes.api.repositories.ReviewRepository;

@Service
public class ReviewService {
	@Autowired
	ReviewRepository reviewRepository;
	
	
	public ReviewResponseDTO store(ReviewCreateDTO reviewCreateDTO) {
		
		Review review = ReviewMapper.toEntity(reviewCreateDTO);
				
		return ReviewMapper.toDTO(reviewRepository.save(review));
	}
	
	public List<ReviewResponseDTO> list(){
		return reviewRepository.findAll().stream().map(ReviewMapper::toDTO).toList();
	}
		
	public ReviewResponseDTO show(long id) {
		Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		return ReviewMapper.toDTO(review);
	}
	
	public void destroy(long id) {
		Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		reviewRepository.delete(review);
	}
}
