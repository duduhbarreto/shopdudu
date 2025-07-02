package br.com.primeshoes.api.mappers;

import org.springframework.stereotype.Component;

import br.com.primeshoes.api.dtos.OrderCreateDTO;
import br.com.primeshoes.api.dtos.OrderResponseDTO;
import br.com.primeshoes.api.entities.Order;
import br.com.primeshoes.api.entities.User;
import br.com.primeshoes.api.repositories.UserRepository;

@Component
public class OrderMapper {

	private UserRepository userRepository;
	
	public OrderMapper(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public Order toEntity(OrderCreateDTO orderCreateDTO) {
		
		User user = userRepository
			.findById(orderCreateDTO.userId())
			.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		Order order = new Order();
		order.setUser(user);
		order.setTotalPrice(orderCreateDTO.totalPrice());
		
		return order;
	}
	
	public static OrderResponseDTO toDTO(Order order) {
		OrderResponseDTO orderResponse = new OrderResponseDTO(order.getId(), UserMapper.toDTO(order.getUser()), order.getTotalPrice(), order.getStatus(), order.getTrackingCode(), order.getCreatedAt(), order.getUpdatedAt());
		
		return orderResponse;
	}
}
