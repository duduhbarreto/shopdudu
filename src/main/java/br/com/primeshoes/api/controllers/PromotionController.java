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

import br.com.primeshoes.api.dtos.PromotionCreateDTO;
import br.com.primeshoes.api.dtos.PromotionResponseDTO;
import br.com.primeshoes.api.services.PromotionService;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

	@Autowired
	PromotionService promotionService;
	
	
	@PostMapping
	public ResponseEntity<PromotionResponseDTO> store(@RequestBody PromotionCreateDTO paymentCreateDTO){
		return new ResponseEntity<>(promotionService.store(paymentCreateDTO), HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<PromotionResponseDTO>> list(){
		return new ResponseEntity<>(promotionService.list(), HttpStatus.OK);
	}
	
	@GetMapping("/show/{id}")
	public ResponseEntity<PromotionResponseDTO> show(@PathVariable long id){
		return new ResponseEntity<>(promotionService.show(id), HttpStatus.OK);
	}
	
	@GetMapping("/destroy/{id}")
	public ResponseEntity<String> destroy(@PathVariable long id) {
		promotionService.destroy(id);
		
		return new ResponseEntity<>("Pagamento deletado com sucesso", HttpStatus.OK);
	}
}