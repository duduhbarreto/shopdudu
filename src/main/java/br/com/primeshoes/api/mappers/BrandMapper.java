package br.com.primeshoes.api.mappers;

import br.com.primeshoes.api.dtos.BrandCreateDTO;
import br.com.primeshoes.api.dtos.BrandResponseDTO;
import br.com.primeshoes.api.entities.Brand;

public class BrandMapper {

	public static Brand toEntity(BrandCreateDTO brandDTO)
	{
		Brand brand = new Brand();
		brand.setName(brandDTO.name());
		
		return brand;
	}
	
	public static BrandResponseDTO toDTO(Brand brand)
	{
		BrandResponseDTO brandResponseDTO = new BrandResponseDTO(brand.getId(), brand.getName());
		
		return brandResponseDTO;
	}
}