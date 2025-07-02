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
import org.springframework.web.bind.annotation.RestController;

import br.com.primeshoes.api.dtos.BrandCreateDTO;
import br.com.primeshoes.api.dtos.CategoryCreateDTO;
import br.com.primeshoes.api.dtos.ProductCreateDTO;
import br.com.primeshoes.api.dtos.ProductResponseDTO;
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
	
	
	@PostMapping
	public ResponseEntity<?> store(@RequestBody ProductCreateDTO productCreateDTO){
		try {
			return new ResponseEntity<>(productService.store(productCreateDTO), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping
	public ResponseEntity<List<ProductResponseDTO>> list(){
		return new ResponseEntity<>(productService.list(), HttpStatus.OK);
	}
	
	@GetMapping("/show/{id}")
	public ResponseEntity<ProductResponseDTO> show(@PathVariable long id){
		return new ResponseEntity<>(productService.show(id), HttpStatus.OK);
	}
	
	@GetMapping("/destroy/{id}")
	public ResponseEntity<String> destroy(@PathVariable long id) {
		productService.destroy(id);
		
		return new ResponseEntity<>("Produto deletado com sucesso", HttpStatus.OK);
	}
	
	@PostMapping("/brand")
	public ResponseEntity<?> storeBrand(@RequestBody BrandCreateDTO brandCreateDTO){
		
		try {
			return new ResponseEntity<>(brandService.store(brandCreateDTO), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/category")
	public ResponseEntity<?> storeCategory(@RequestBody CategoryCreateDTO categoryCreateDTO){
		
		try { 
			return new ResponseEntity<>(categoryService.store(categoryCreateDTO), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
}
