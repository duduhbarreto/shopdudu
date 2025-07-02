package br.com.primeshoes.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.primeshoes.api.entities.Cart;
import br.com.primeshoes.api.entities.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	//Lista todos os itens de um carrinho
	@Query("SELECT ci FROM CartItem ci WHERE ci.cart = :cart")
	List<CartItem> findByCart(Cart cart);
}
