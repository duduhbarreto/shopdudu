package br.com.primeshoes.api.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.primeshoes.api.dtos.BrandCreateDTO;
import br.com.primeshoes.api.dtos.CategoryCreateDTO;
import br.com.primeshoes.api.dtos.ProductCreateDTO;
import br.com.primeshoes.api.dtos.ProductResponseDTO;
import br.com.primeshoes.api.entities.ProductVariation;
import br.com.primeshoes.api.services.BrandService;
import br.com.primeshoes.api.services.CategoryService;
import br.com.primeshoes.api.services.ProductService;


@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;
    
    @Autowired
    BrandService brandService;
    
    @Autowired
    CategoryService categoryService;
    
    /**
     * Cadastra um novo produto
     */
    @PostMapping
    public ResponseEntity<?> store(@RequestBody ProductCreateDTO productCreateDTO) {
        try {
            return new ResponseEntity<>(productService.store(productCreateDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    /**
     * Lista todos os produtos
     */
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> list() {
        return new ResponseEntity<>(productService.list(), HttpStatus.OK);
    }
    
    /**
     * Busca um produto pelo ID
     */
    @GetMapping("/show/{id}")
    public ResponseEntity<ProductResponseDTO> show(@PathVariable long id) {
        return new ResponseEntity<>(productService.show(id), HttpStatus.OK);
    }
    
    /**
     * Remove um produto
     */
    @GetMapping("/destroy/{id}")
    public ResponseEntity<String> destroy(@PathVariable long id) {
        productService.destroy(id);
        return new ResponseEntity<>("Produto deletado com sucesso", HttpStatus.OK);
    }
    
    /**
     * Busca produtos por palavra-chave (nome ou descrição)
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponseDTO>> search(@RequestParam String keyword) {
        return new ResponseEntity<>(productService.searchByKeyword(keyword), HttpStatus.OK);
    }
    
    /**
     * Filtra produtos por categoria, marca e faixa de preço
     */
    @GetMapping("/filter")
    public ResponseEntity<List<ProductResponseDTO>> filter(
        @RequestParam(required = false) Long categoryId,
        @RequestParam(required = false) Long brandId,
        @RequestParam(required = false, defaultValue = "0") float minPrice,
        @RequestParam(required = false, defaultValue = "999999") float maxPrice
    ) {
        return new ResponseEntity<>(
            productService.filterProducts(categoryId, brandId, minPrice, maxPrice),
            HttpStatus.OK
        );
    }
    
    /**
     * Retorna os produtos mais bem avaliados
     */
    @GetMapping("/top-rated")
    public ResponseEntity<List<ProductResponseDTO>> getTopRated() {
        return new ResponseEntity<>(productService.getTopRatedProducts(), HttpStatus.OK);
    }
    
    /**
     * Retorna os produtos mais recentes
     */
    @GetMapping("/newest")
    public ResponseEntity<List<ProductResponseDTO>> getNewest() {
        return new ResponseEntity<>(productService.getNewestProducts(), HttpStatus.OK);
    }
    
    /**
     * Retorna as variações de um produto
     */
    @GetMapping("/variations/{productId}")
    public ResponseEntity<List<ProductVariation>> getProductVariations(@PathVariable long productId) {
        return new ResponseEntity<>(productService.getProductVariations(productId), HttpStatus.OK);
    }
    
    /**
     * Busca produtos por categoria
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponseDTO>> findByCategory(@PathVariable long categoryId) {
        return new ResponseEntity<>(productService.findByCategory(categoryId), HttpStatus.OK);
    }
    
    /**
     * Busca produtos por marca
     */
    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<ProductResponseDTO>> findByBrand(@PathVariable long brandId) {
        return new ResponseEntity<>(productService.findByBrand(brandId), HttpStatus.OK);
    }
    
    /**
     * Busca produtos por faixa de preço
     */
    @GetMapping("/price-range")
    public ResponseEntity<List<ProductResponseDTO>> findByPriceRange(
        @RequestParam(defaultValue = "0") float minPrice,
        @RequestParam(defaultValue = "999999") float maxPrice
    ) {
        return new ResponseEntity<>(productService.findByPriceRange(minPrice, maxPrice), HttpStatus.OK);
    }
    
    /**
     * Cadastra uma nova marca
     */
    @PostMapping("/brand")
    public ResponseEntity<?> storeBrand(@RequestBody BrandCreateDTO brandCreateDTO) {
        try {
            return new ResponseEntity<>(brandService.store(brandCreateDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    /**
     * Cadastra uma nova categoria
     */
    @PostMapping("/category")
    public ResponseEntity<?> storeCategory(@RequestBody CategoryCreateDTO categoryCreateDTO) {
        try { 
            return new ResponseEntity<>(categoryService.store(categoryCreateDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    /**
     * Lista todas as categorias
     */
    @GetMapping("/categories")
    public ResponseEntity<?> listCategories() {
        try {
            return new ResponseEntity<>(categoryService.list(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    /**
     * Lista todas as marcas
     */
    @GetMapping("/brands")
    public ResponseEntity<?> listBrands() {
        try {
            return new ResponseEntity<>(brandService.list(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/variations/{productId}")
    public ResponseEntity<List<ProductVariation>> getProductVariations(@PathVariable long productId) {
        Product product = productService.findById(productId);
        List<ProductVariation> variations = productRepository.showByProduct(product);
        return new ResponseEntity<>(variations, HttpStatus.OK);
    }
}