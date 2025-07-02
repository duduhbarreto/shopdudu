package br.com.primeshoes.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.primeshoes.api.entities.Brand;
import br.com.primeshoes.api.entities.Category;
import br.com.primeshoes.api.entities.Product;
import br.com.primeshoes.api.entities.ProductVariation;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    @Query("SELECT pv FROM ProductVariation pv WHERE pv.product = :product")
    List<ProductVariation> showByProduct(@Param("product") Product product);
    
    @Query("SELECT pv FROM ProductVariation pv WHERE pv.id = :id")
    Optional<ProductVariation> findVariarionById(@Param("id") Long id);
    
    // Novos métodos para busca e filtro
    List<Product> findByNameContainingIgnoreCase(String name);
    
    List<Product> findByCategory(Category category);
    
    List<Product> findByBrand(Brand brand);
    
    List<Product> findByPriceBetween(float minPrice, float maxPrice);
    
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword% OR p.description LIKE %:keyword%")
    List<Product> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT p FROM Product p WHERE p.category = :category AND p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> filterProducts(
        @Param("category") Category category,
        @Param("minPrice") float minPrice,
        @Param("maxPrice") float maxPrice
    );
    
    @Query("SELECT p FROM Product p ORDER BY p.rating DESC LIMIT 10")
    List<Product> findTopRatedProducts();
    
    @Query("SELECT p FROM Product p ORDER BY p.createdAt DESC LIMIT 10")
    List<Product> findNewestProducts();
}