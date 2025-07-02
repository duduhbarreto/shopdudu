package br.com.primeshoes.api.mappers;

import org.springframework.stereotype.Component;

import br.com.primeshoes.api.dtos.PaymentCreateDTO;
import br.com.primeshoes.api.dtos.PaymentResponseDTO;
import br.com.primeshoes.api.entities.Order;
import br.com.primeshoes.api.entities.Payment;
import br.com.primeshoes.api.repositories.OrderRepository;

@Component
public class PaymentMapper {
	
	private OrderRepository orderRepository;
	
	public PaymentMapper(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}
	
	public Payment toEntity(PaymentCreateDTO paymentCreateDTO) {
		
		Order order = orderRepository
				.findById(paymentCreateDTO.orderId())
				.orElseThrow(() -> new RuntimeException("Ordem de compra não encontrada"));
		
		Payment payment = new Payment();
		payment.setAmount(paymentCreateDTO.amount());
		payment.setOrder(order);
		payment.setPaymentMethod(paymentCreateDTO.paymentMethod());
		payment.setPaymentStatus(paymentCreateDTO.paymentStatus());
		
		
		return payment;
	}
	
	public static PaymentResponseDTO toDTO(Payment payment) {
		PaymentResponseDTO cartResponse = new PaymentResponseDTO(payment.getId(), OrderMapper.toDTO(payment.getOrder()), payment.getAmount(), payment.getPaymentMethod(), payment.getPaymentStatus());
		
		return cartResponse;
	}
	
}
