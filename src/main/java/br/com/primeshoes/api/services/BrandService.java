package br.com.primeshoes.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.BrandCreateDTO;
import br.com.primeshoes.api.dtos.BrandResponseDTO;
import br.com.primeshoes.api.entities.Brand;
import br.com.primeshoes.api.mappers.BrandMapper;
import br.com.primeshoes.api.repositories.BrandRepository;

@Service
public class BrandService {
	
	@Autowired
	protected BrandRepository brandRepository;
	
	public BrandResponseDTO store(BrandCreateDTO brandCreate) throws Exception
	{
		Brand brand = BrandMapper.toEntity(brandCreate);
				
		return BrandMapper.toDTO(brandRepository.save(brand));
	}
	
	public BrandResponseDTO show(long id) {
		Brand brand = brandRepository.findById(id).orElseThrow(() -> new RuntimeException("Marca não encontrada!"));
		
		return BrandMapper.toDTO(brand);
	}
	
	protected Brand search(long id) {
		Brand brand = brandRepository.findById(id).orElseThrow(() -> new RuntimeException("Marca não encontrada!"));
		
		return brand;
	}

}
