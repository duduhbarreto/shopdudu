package br.com.primeshoes.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.primeshoes.api.entities.ProductVariation;

@Repository
public interface ProductVariationRepository extends JpaRepository<ProductVariation, Long>{

}
