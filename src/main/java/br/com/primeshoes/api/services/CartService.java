package br.com.primeshoes.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.CartCreateDTO;
import br.com.primeshoes.api.dtos.CartResponseDTO;
import br.com.primeshoes.api.entities.Cart;
import br.com.primeshoes.api.mappers.CartMapper;
import br.com.primeshoes.api.repositories.CartRepository;

@Service
public class CartService {

	@Autowired
	CartRepository cartRepository;
	
	public CartResponseDTO store(CartCreateDTO cartCreateDTO) {
		
		Cart cart = CartMapper.toEntity(cartCreateDTO);
		
		return CartMapper.toDTO(cartRepository.save(cart));
	}
	
	public List<CartResponseDTO> list(){
		return cartRepository.findAll().stream().map(CartMapper::toDTO).toList();
	}
		
	public CartResponseDTO show(long id) {
		Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		return CartMapper.toDTO(cart);
	}
}
