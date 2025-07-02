package br.com.primeshoes.api.dtos;

public record AddressCreateDTO(
    String street,
    String number,
    String neighborhood,
    String city,
    String state,
    String complement,
    long zipcode,
    long userId
) {}