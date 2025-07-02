package br.com.primeshoes.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.CategoryCreateDTO;
import br.com.primeshoes.api.dtos.CategoryResponseDTO;
import br.com.primeshoes.api.entities.Category;
import br.com.primeshoes.api.mappers.CategoryMapper;
import br.com.primeshoes.api.repositories.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    protected CategoryRepository categoryRepository;
    
    
    public CategoryResponseDTO store(CategoryCreateDTO categoryCreate){
        
        Category category = CategoryMapper.toEntity(categoryCreate);
                
        return CategoryMapper.toDTO(categoryRepository.save(category)); 
    }
    
    public List<CategoryResponseDTO> list() {
        return categoryRepository.findAll().stream()
            .map(CategoryMapper::toDTO)
            .toList();
    }
    
    protected Category search(long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoria não encontrada!"));
        
        return category;
    }
}