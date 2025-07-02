package br.com.primeshoes.api.mappers;

import br.com.primeshoes.api.dtos.OrderItemCreateDTO;
import br.com.primeshoes.api.dtos.OrderItemResponseDTO;
import br.com.primeshoes.api.entities.OrderItem;

public class OrderItemMapper {
	
	public static OrderItem toEntity(OrderItemCreateDTO orderItemCreateDTO) {
		OrderItem orderItem = new OrderItem();
		orderItem.setOrder(orderItemCreateDTO.order());
		orderItem.setProductVariation(orderItemCreateDTO.productVariation());
		orderItem.setQuantity(orderItemCreateDTO.quantity());
		orderItem.setSubtotal(orderItemCreateDTO.subtotal());
		
		return orderItem;
	}
	
	public static OrderItemResponseDTO toDTO(OrderItem order) {
		OrderItemResponseDTO orderResponse = new OrderItemResponseDTO(order.getId(), order.getQuantity(), order.getSubtotal(), order.getOrder(), order.getProductVariation());
		
		return orderResponse;
	}
}