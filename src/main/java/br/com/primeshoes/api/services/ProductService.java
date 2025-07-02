package br.com.primeshoes.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.auth.SecurityConfig;
import br.com.primeshoes.api.dtos.ProductCreateDTO;
import br.com.primeshoes.api.dtos.ProductResponseDTO;
import br.com.primeshoes.api.entities.Brand;
import br.com.primeshoes.api.entities.Category;
import br.com.primeshoes.api.entities.Product;
import br.com.primeshoes.api.entities.User;
import br.com.primeshoes.api.mappers.ProductMapper;
import br.com.primeshoes.api.repositories.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	ProductRepository productRepository;
	private BrandService brandService;
	private CategoryService categoryService;
	private SecurityConfig config;
	private ProductVariationService variationService;
	
	
	public ProductService(BrandService brandService, CategoryService categoryService, SecurityConfig config, ProductVariationService variationService) {
		this.variationService = variationService;
		this.brandService = brandService;
		this.categoryService = categoryService;
		this.config = config;
	}
	
	public ProductResponseDTO store(ProductCreateDTO productCreateDTO) throws Exception {
				
		Brand brand = brandService.search(productCreateDTO.brand_id()); 
		
		Category category = categoryService.search(productCreateDTO.category_id());
		
		Product product = ProductMapper.toEntity(productCreateDTO, category, brand);
		User user = config.getAuthUser();
		product.setUser(user);
		
		Product productSave = productRepository.save(product);
		
		
		productCreateDTO.product_variation().forEach( variation -> {
			variationService.save(variation, productSave);
		});
		
				
		return ProductMapper.toDTO(productSave);
	}
	
	public List<ProductResponseDTO> list(){
		return productRepository.findAll().stream().map(ProductMapper::toDTO).toList();
	}
		
	public ProductResponseDTO show(long id) {
		Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		return ProductMapper.toDTO(product);
	}
	
	public void destroy(long id) {
		Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		
		productRepository.delete(product);
	}
}