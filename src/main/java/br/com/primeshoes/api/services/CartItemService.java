package br.com.primeshoes.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.CartItemCreateDTO;
import br.com.primeshoes.api.dtos.CartItemResponseDTO;
import br.com.primeshoes.api.dtos.CartItemUpdateDTO;
import br.com.primeshoes.api.entities.Cart;
import br.com.primeshoes.api.entities.CartItem;
import br.com.primeshoes.api.mappers.CartItemMapper;
import br.com.primeshoes.api.repositories.CartItemRepository;
import br.com.primeshoes.api.repositories.CartRepository;

@Service
public class CartItemService {
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	private CartRepository cartRepository;
	
	public CartItemService(CartRepository cartRepository) {
		this.cartRepository = cartRepository;
	}
	
	@Autowired
	private CartItemMapper cartItemMapper;
		
	public CartItemResponseDTO store(CartItemCreateDTO cartItemCreateDTO) {
		
		CartItem cartItem = cartItemMapper.toEntity(cartItemCreateDTO);
				
		return CartItemMapper.toDTO(cartItemRepository.save(cartItem));
	}
	
	public CartItemResponseDTO update(CartItemUpdateDTO updateDTO) {
		CartItem cartItem = cartItemRepository
				.findById(updateDTO.id())
				.orElseThrow(() -> new RuntimeException("Item não encontrado no carrinho"));
		
		
		cartItem.setQuantity(updateDTO.quantity());
		cartItem.setSubtotal(updateDTO.subtotal());
		
		cartItemRepository.save(cartItem);
		
		return CartItemMapper.toDTO(cartItem);
		
	}
	
	public List<CartItemResponseDTO> list(long cartId){
		Cart cart = cartRepository
				.findById(cartId)
				.orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
		
		return cartItemRepository.findByCart(cart).stream().map(CartItemMapper::toDTO).toList();
	}
	
	public void remove(long id) {
		CartItem cartItem = cartItemRepository
				.findById(id)
				.orElseThrow(() -> new RuntimeException("Item não encontrado no carrinho"));
		
		cartItemRepository.delete(cartItem);
	}
}
 