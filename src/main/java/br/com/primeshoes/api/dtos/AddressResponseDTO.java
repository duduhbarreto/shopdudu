package br.com.primeshoes.api.dtos;

import java.time.LocalDateTime;

public record AddressResponseDTO(
    long id,
    String street,
    String number,
    String neighborhood,
    String city,
    String state,
    String complement,
    long zipcode,
    UserResponseDTO user,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}