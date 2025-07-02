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

import br.com.primeshoes.api.dtos.ReviewCreateDTO;
import br.com.primeshoes.api.dtos.ReviewResponseDTO;
import br.com.primeshoes.api.services.ReviewService;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

	@Autowired
	ReviewService reviewService;
	
	
	@PostMapping
	public ResponseEntity<ReviewResponseDTO> store(@RequestBody ReviewCreateDTO paymentCreateDTO){
		return new ResponseEntity<>(reviewService.store(paymentCreateDTO), HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<ReviewResponseDTO>> list(){
		return new ResponseEntity<>(reviewService.list(), HttpStatus.OK);
	}
	
	@GetMapping("/show/{id}")
	public ResponseEntity<ReviewResponseDTO> show(@PathVariable long id){
		return new ResponseEntity<>(reviewService.show(id), HttpStatus.OK);
	}
	
	@GetMapping("/destroy/{id}")
	public ResponseEntity<String> destroy(@PathVariable long id) {
		reviewService.destroy(id);
		
		return new ResponseEntity<>("Pagamento deletado com sucesso", HttpStatus.OK);
	}
}
