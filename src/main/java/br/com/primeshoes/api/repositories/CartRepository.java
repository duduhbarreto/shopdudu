package br.com.primeshoes.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.primeshoes.api.entities.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	
}