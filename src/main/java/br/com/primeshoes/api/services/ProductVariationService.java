package br.com.primeshoes.api.services;

import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.ProductVariationCreateDTO;
import br.com.primeshoes.api.entities.Product;
import br.com.primeshoes.api.entities.ProductVariation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class ProductVariationService {


	@PersistenceContext
    private EntityManager entityManager;
	
	@Transactional
	 public ProductVariation save(ProductVariationCreateDTO variation, Product product) {
		 ProductVariation productVariation = new ProductVariation();
		 productVariation.setColor(variation.color());
		 productVariation.setStock(variation.stock());
		 productVariation.setSize(variation.size());
		 productVariation.setProduct(product);
			 				
		 entityManager.persist(productVariation);
		 
		 return productVariation;
	 }
}
