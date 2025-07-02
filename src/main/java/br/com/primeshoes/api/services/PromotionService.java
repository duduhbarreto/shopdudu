package br.com.primeshoes.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.PromotionCreateDTO;
import br.com.primeshoes.api.dtos.PromotionResponseDTO;
import br.com.primeshoes.api.entities.Promotion;
import br.com.primeshoes.api.mappers.PromotionMapper;
import br.com.primeshoes.api.repositories.PromotionRepository;

@Service
public class PromotionService {
	@Autowired
	PromotionRepository promotionRepository;
	
	
	public PromotionResponseDTO store(PromotionCreateDTO promotionCreateDTO) {
		
		Promotion promotion = PromotionMapper.toEntity(promotionCreateDTO);
				
		return PromotionMapper.toDTO(promotionRepository.save(promotion));
	}
	
	public List<PromotionResponseDTO> list(){
		return promotionRepository.findAll().stream().map(PromotionMapper::toDTO).toList();
	}
		
	public PromotionResponseDTO show(long id) {
		Promotion promotion = promotionRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		return PromotionMapper.toDTO(promotion);
	}
	
	public void destroy(long id) {
		Promotion promotion = promotionRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		promotionRepository.delete(promotion);
	}
}
