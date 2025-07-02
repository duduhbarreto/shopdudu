package br.com.primeshoes.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.primeshoes.api.dtos.CartCreateDTO;
import br.com.primeshoes.api.dtos.CartItemCreateDTO;
import br.com.primeshoes.api.dtos.CartItemResponseDTO;
import br.com.primeshoes.api.dtos.CartItemUpdateDTO;
import br.com.primeshoes.api.dtos.CartResponseDTO;
import br.com.primeshoes.api.services.CartItemService;
import br.com.primeshoes.api.services.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

	@Autowired
	private CartService cartService;
	
	@Autowired
	private CartItemService cartItemService;
	
	
	@PostMapping
	public ResponseEntity<CartResponseDTO> store(@RequestBody CartCreateDTO cartCreateDTO){
		return new ResponseEntity<>(cartService.store(cartCreateDTO), HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<CartResponseDTO>> list(){
		return new ResponseEntity<>(cartService.list(), HttpStatus.OK);
	}
	
	@GetMapping("/show/{id}")
	public ResponseEntity<CartResponseDTO> show(@PathVariable long id){
		return new ResponseEntity<CartResponseDTO>(cartService.show(id), HttpStatus.OK);
	}
	
	@PostMapping("/putItem")
	public ResponseEntity<CartItemResponseDTO> putItemsInCart(@RequestBody CartItemCreateDTO cartItemCreateDTO){
		return new ResponseEntity<>(cartItemService.store(cartItemCreateDTO), HttpStatus.CREATED);
	}
	
	@GetMapping("/listItems/{cartId}")
	public ResponseEntity<List<CartItemResponseDTO>> listItemsInCart(@PathVariable long cartId){
		return new ResponseEntity<>(cartItemService.list(cartId), HttpStatus.OK);
	}
	
	@PutMapping("/updateItem")
	public ResponseEntity<CartItemResponseDTO> updateItemInCart(@RequestBody CartItemUpdateDTO cartItemUpdateDTO){
		return new ResponseEntity<>(cartItemService.update(cartItemUpdateDTO), HttpStatus.OK);
	}
	
	@GetMapping("/removeItem/{id}")
	public ResponseEntity<String> removeItemFromCart(@PathVariable long id){
		cartItemService.remove(id);
		return new ResponseEntity<>("Item removido do carrinho com sucesso!", HttpStatus.OK);
	}
}