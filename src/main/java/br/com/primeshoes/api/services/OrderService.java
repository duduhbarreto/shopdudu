package br.com.primeshoes.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.OrderCreateDTO;
import br.com.primeshoes.api.dtos.OrderResponseDTO;
import br.com.primeshoes.api.entities.Order;
import br.com.primeshoes.api.mappers.OrderMapper;
import br.com.primeshoes.api.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	OrderMapper orderMapper;
	
	
	public OrderResponseDTO store(OrderCreateDTO orderCreateDTO) {
		
		Order order = orderMapper.toEntity(orderCreateDTO);
				
		return OrderMapper.toDTO(orderRepository.save(order));
	}
	
	public List<OrderResponseDTO> list(){
		return orderRepository.findAll().stream().map(OrderMapper::toDTO).toList();
	}
		
	public OrderResponseDTO show(long id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		return OrderMapper.toDTO(order);
	}
	
	public void destroy(long id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		orderRepository.delete(order);
	}
}