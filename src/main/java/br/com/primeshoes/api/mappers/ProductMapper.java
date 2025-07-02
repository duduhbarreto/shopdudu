package br.com.primeshoes.api.mappers;

import br.com.primeshoes.api.dtos.ProductCreateDTO;
import br.com.primeshoes.api.dtos.ProductResponseDTO;
import br.com.primeshoes.api.entities.Brand;
import br.com.primeshoes.api.entities.Category;
import br.com.primeshoes.api.entities.Product;

public class ProductMapper {
	
	public static Product toEntity(ProductCreateDTO productCreateDTO, Category category, Brand brand) {		
		Product product = new Product();
		product.setBrand(brand);
		product.setCategory(category);
		product.setDescription(productCreateDTO.description());
		product.setImageUrl(productCreateDTO.imageUrl());
		product.setName(productCreateDTO.name());
		product.setPrice(productCreateDTO.price());
		product.setRating(productCreateDTO.rating());
		
		return product;
	}
	
	public static ProductResponseDTO toDTO(Product product) {
		
		ProductResponseDTO cartResponse = new ProductResponseDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getCategory(), product.getBrand(), product.getImageUrl(), product.getRating());
		
		return cartResponse;
	}
	
}
