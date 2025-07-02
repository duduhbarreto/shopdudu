package br.com.primeshoes.api.dtos;

public record CartItemUpdateDTO(
			long id,
			int quantity,
			float subtotal
		) {}