package br.com.primeshoes.api.mappers;

import br.com.primeshoes.api.dtos.CartCreateDTO;
import br.com.primeshoes.api.dtos.CartResponseDTO;
import br.com.primeshoes.api.entities.Cart;

public class CartMapper {

	public static Cart toEntity(CartCreateDTO cartCreateDTO) {
		Cart cart = new Cart();
		cart.setUser(cartCreateDTO.user());
		
		return cart;
	}
	
	public static CartResponseDTO toDTO(Cart cart) {
		CartResponseDTO cartResponse = new CartResponseDTO(cart.getId(), UserMapper.toDTO(cart.getUser()));
		
		return cartResponse;
	}
}