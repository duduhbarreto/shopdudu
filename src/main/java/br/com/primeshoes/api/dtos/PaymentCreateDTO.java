package br.com.primeshoes.api.dtos;

import br.com.primeshoes.api.enuns.PaymentMethod;
import br.com.primeshoes.api.enuns.PaymentStatus;

public record PaymentCreateDTO(
		long orderId,
		float amount,
		PaymentMethod paymentMethod,
		PaymentStatus paymentStatus
		) {}