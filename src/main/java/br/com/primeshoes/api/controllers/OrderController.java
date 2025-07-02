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

import br.com.primeshoes.api.dtos.OrderResponseDTO;
import br.com.primeshoes.api.dtos.OrderCreateDTO;
import br.com.primeshoes.api.services.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {

	@Autowired
	OrderService orderService;
	
	
	@PostMapping
	public ResponseEntity<OrderResponseDTO> store(@RequestBody OrderCreateDTO orderCreateDTO){
		return new ResponseEntity<>(orderService.store(orderCreateDTO), HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<OrderResponseDTO>> list(){
		return new ResponseEntity<>(orderService.list(), HttpStatus.OK);
	}
	
	@GetMapping("/show/{id}")
	public ResponseEntity<OrderResponseDTO> show(@PathVariable long id){
		return new ResponseEntity<>(orderService.show(id), HttpStatus.OK);
	}
	
	@GetMapping("/destroy/{id}")
	public ResponseEntity<String> destroy(@PathVariable long id) {
		orderService.destroy(id);
		
		return new ResponseEntity<>("Ordem de compra deletada com sucesso", HttpStatus.OK);
	}
}
