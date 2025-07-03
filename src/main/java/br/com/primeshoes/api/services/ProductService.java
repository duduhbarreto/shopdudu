package br.com.primeshoes.api.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.auth.SecurityConfig;
import br.com.primeshoes.api.dtos.ProductCreateDTO;
import br.com.primeshoes.api.dtos.ProductResponseDTO;
import br.com.primeshoes.api.entities.Brand;
import br.com.primeshoes.api.entities.Category;
import br.com.primeshoes.api.entities.Product;
import br.com.primeshoes.api.entities.ProductVariation;
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
    
    /**
     * Cadastra um novo produto
     */
    public ProductResponseDTO store(ProductCreateDTO productCreateDTO) throws Exception {
        Brand brand = brandService.search(productCreateDTO.brand_id()); 
        Category category = categoryService.search(productCreateDTO.category_id());
        
        Product product = ProductMapper.toEntity(productCreateDTO, category, brand);
        User user = config.getAuthUser();
        product.setUser(user);
        
        Product productSave = productRepository.save(product);
        
        productCreateDTO.product_variation().forEach(variation -> {
            variationService.save(variation, productSave);
        });
        
        return ProductMapper.toDTO(productSave);
    }
    
    /**
     * Lista todos os produtos
     */
    public List<ProductResponseDTO> list() {
        return productRepository.findAll().stream()
            .map(ProductMapper::toDTO)
            .toList();
    }
    
    /**
     * Busca um produto pelo ID
     */
    public ProductResponseDTO show(long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
        
        return ProductMapper.toDTO(product);
    }
    
    /**
     * Remove um produto
     */
    public void destroy(long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
        
        productRepository.delete(product);
    }
    
    /**
     * Busca produtos por palavra-chave (nome ou descrição)
     */
    public List<ProductResponseDTO> searchByKeyword(String keyword) {
        return productRepository.searchByKeyword(keyword)
            .stream()
            .map(ProductMapper::toDTO)
            .toList();
    }
    
    /**
     * Filtra produtos por categoria, marca e faixa de preço
     */
    public List<ProductResponseDTO> filterProducts(
        Long categoryId,
        Long brandId,
        float minPrice,
        float maxPrice
    ) {
        List<Product> products;
        
        if (categoryId != null && brandId != null) {
            Category category = categoryService.search(categoryId);
            Brand brand = brandService.search(brandId);
            
            products = productRepository.findAll().stream()
                .filter(p -> p.getCategory().getId() == category.getId())
                .filter(p -> p.getBrand().getId() == brand.getId())
                .filter(p -> p.getPrice() >= minPrice && p.getPrice() <= maxPrice)
                .collect(Collectors.toList());
        } else if (categoryId != null) {
            Category category = categoryService.search(categoryId);
            products = productRepository.findAll().stream()
                .filter(p -> p.getCategory().getId() == category.getId())
                .filter(p -> p.getPrice() >= minPrice && p.getPrice() <= maxPrice)
                .collect(Collectors.toList());
        } else if (brandId != null) {
            Brand brand = brandService.search(brandId);
            products = productRepository.findAll().stream()
                .filter(p -> p.getBrand().getId() == brand.getId())
                .filter(p -> p.getPrice() >= minPrice && p.getPrice() <= maxPrice)
                .collect(Collectors.toList());
        } else {
            products = productRepository.findAll().stream()
                .filter(p -> p.getPrice() >= minPrice && p.getPrice() <= maxPrice)
                .collect(Collectors.toList());
        }
        
        return products.stream()
            .map(ProductMapper::toDTO)
            .toList();
    }
    
    /**
     * Retorna os produtos mais bem avaliados
     */
    public List<ProductResponseDTO> getTopRatedProducts() {
        try {
            return productRepository.findTopRatedProducts()
                .stream()
                .map(ProductMapper::toDTO)
                .toList();
        } catch (Exception e) {
            // Caso o banco de dados não suporte a cláusula LIMIT
            return productRepository.findAll().stream()
                .sorted((p1, p2) -> Float.compare(p2.getRating(), p1.getRating()))
                .limit(10)
                .map(ProductMapper::toDTO)
                .toList();
        }
    }
    
    /**
     * Retorna os produtos mais recentes
     */
    public List<ProductResponseDTO> getNewestProducts() {
        try {
            return productRepository.findNewestProducts()
                .stream()
                .map(ProductMapper::toDTO)
                .toList();
        } catch (Exception e) {
            // Caso o banco de dados não suporte a cláusula LIMIT
            return productRepository.findAll().stream()
                .sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()))
                .limit(10)
                .map(ProductMapper::toDTO)
                .toList();
        }
    }
    
    /**
     * Retorna as variações de um produto
     */
    public List<ProductVariation> getProductVariations(long productId) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + productId));
        
        return productRepository.showByProduct(product);
    }
    
    /**
     * Busca produtos por categoria
     */
    public List<ProductResponseDTO> findByCategory(long categoryId) {
        Category category = categoryService.search(categoryId);
        return productRepository.findByCategory(category)
            .stream()
            .map(ProductMapper::toDTO)
            .toList();
    }
    
    /**
     * Busca produtos por marca
     */
    public List<ProductResponseDTO> findByBrand(long brandId) {
        Brand brand = brandService.search(brandId);
        return productRepository.findByBrand(brand)
            .stream()
            .map(ProductMapper::toDTO)
            .toList();
    }
    
    /**
     * Busca produtos por faixa de preço
     */
    public List<ProductResponseDTO> findByPriceRange(float minPrice, float maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice)
            .stream()
            .map(ProductMapper::toDTO)
            .toList();
    }
    public Product findById(long id) {
    return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }
}