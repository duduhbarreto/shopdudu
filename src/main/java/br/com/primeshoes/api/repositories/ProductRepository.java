package br.com.primeshoes.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.primeshoes.api.entities.Product;
import br.com.primeshoes.api.entities.ProductVariation;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
		 
	//Retorna a lista de variações de acordo com o ID do produto
	@Query("SELECT pv FROM ProductVariation pv WHERE pv.product = :product")
	List<ProductVariation> showByProduct(@Param("product") Product product);
	
	//Retorna a variação do produto
	@Query("SELECT pv FROM ProductVariation pv WHERE pv.id = :id")
	Optional<ProductVariation> findVariarionById(@Param("id") Long id);
	
}