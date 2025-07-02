package br.com.primeshoes.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.primeshoes.api.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
