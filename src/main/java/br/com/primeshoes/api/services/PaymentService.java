package br.com.primeshoes.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.PaymentCreateDTO;
import br.com.primeshoes.api.dtos.PaymentResponseDTO;
import br.com.primeshoes.api.entities.Payment;
import br.com.primeshoes.api.mappers.PaymentMapper;
import br.com.primeshoes.api.repositories.PaymentRepository;

@Service
public class PaymentService {
	
	@Autowired
	private PaymentRepository paymentRepository;
	
	@Autowired
	private PaymentMapper paymentMapper;
	
	public PaymentResponseDTO store(PaymentCreateDTO PaymentCreateDTO) {
		
		Payment payment = paymentMapper.toEntity(PaymentCreateDTO);
				
		return PaymentMapper.toDTO(paymentRepository.save(payment));
	}
	
	public List<PaymentResponseDTO> list(){
		return paymentRepository.findAll().stream().map(PaymentMapper::toDTO).toList();
	}
		
	public PaymentResponseDTO show(long id) {
		Payment payment = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		return PaymentMapper.toDTO(payment);
	}
	
	public void destroy(long id) {
		Payment payment = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		paymentRepository.delete(payment);
	}
}