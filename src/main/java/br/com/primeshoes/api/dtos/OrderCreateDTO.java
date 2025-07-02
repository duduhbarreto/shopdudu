package br.com.primeshoes.api.dtos;

public record OrderCreateDTO(
			long userId,
			float totalPrice
		) {}
