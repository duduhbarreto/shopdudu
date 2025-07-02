package br.com.primeshoes.api.dtos;

import br.com.primeshoes.api.enuns.PaymentMethod;
import br.com.primeshoes.api.enuns.PaymentStatus;

public record PaymentResponseDTO(
		long id,
		OrderResponseDTO order,
		float amount,
		PaymentMethod paymentMethod,
		PaymentStatus paymentStatus
		) {}
