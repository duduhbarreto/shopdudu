package br.com.primeshoes.api.mappers;

import br.com.primeshoes.api.dtos.CategoryCreateDTO;
import br.com.primeshoes.api.dtos.CategoryResponseDTO;
import br.com.primeshoes.api.entities.Category;

public class CategoryMapper {
	
	public static Category toEntity(CategoryCreateDTO brandDTO)
	{
		Category brand = new Category();
		brand.setName(brandDTO.name());
		
		return brand;
	}
	
	public static CategoryResponseDTO toDTO(Category category)
	{
		CategoryResponseDTO brandResponseDTO = new CategoryResponseDTO(category.getId(), category.getName());
		
		return brandResponseDTO;
	}
}
