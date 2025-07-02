package br.com.primeshoes.api.mappers;

import org.springframework.stereotype.Component;

import br.com.primeshoes.api.dtos.CartItemCreateDTO;
import br.com.primeshoes.api.dtos.CartItemResponseDTO;
import br.com.primeshoes.api.entities.Cart;
import br.com.primeshoes.api.entities.CartItem;
import br.com.primeshoes.api.entities.ProductVariation;
import br.com.primeshoes.api.repositories.CartRepository;
import br.com.primeshoes.api.repositories.ProductRepository;

@Component
public class CartItemMapper {
	
	private final CartRepository cartRepository;
	private final ProductRepository productRepository;
	
	public CartItemMapper(CartRepository cartRepository, ProductRepository productRepository) {
		this.cartRepository = cartRepository;
		this.productRepository = productRepository;
	}
	
	public CartItem toEntity(CartItemCreateDTO cartCreateDTO) {
				
		Cart cart = cartRepository.findById(cartCreateDTO.cartId()).orElseThrow(() -> 
				new RuntimeException("Carrinho não encontrado com o ID: "+ cartCreateDTO.cartId()));
				
		ProductVariation productVariation = productRepository
				.findVariarionById(cartCreateDTO.productVariationId())
				.orElseThrow(() -> new RuntimeException("Variação do produto não encontrada com o id: "+ cartCreateDTO.productVariationId()));
		
		CartItem cartItem = new CartItem();
		cartItem.setCart(cart);
		cartItem.setQuantity(cartCreateDTO.quantity());
		cartItem.setSubtotal(cartCreateDTO.subtotal());
		cartItem.setProductVariation(productVariation);
		
		return cartItem;
	}
	
	public static CartItemResponseDTO toDTO(CartItem cart) {
		
		CartItemResponseDTO cartResponse = new CartItemResponseDTO(cart.getId(), cart.getQuantity(), cart.getSubtotal(), CartMapper.toDTO(cart.getCart()), ProductVariationMapper.toDTO(cart.getProductVariation()), cart.getCreatedAt(), cart.getUpdatedAt());
		
		return cartResponse;
	}
	
}