package br.com.primeshoes.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.primeshoes.api.dtos.AddressCreateDTO;
import br.com.primeshoes.api.dtos.AddressResponseDTO;
import br.com.primeshoes.api.dtos.AddressUpdateDTO;
import br.com.primeshoes.api.services.AddressService;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;
    
    @PostMapping
    public ResponseEntity<AddressResponseDTO> store(@RequestBody AddressCreateDTO addressCreateDTO) {
        return new ResponseEntity<>(addressService.store(addressCreateDTO), HttpStatus.CREATED);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AddressResponseDTO>> listByUser(@PathVariable long userId) {
        return new ResponseEntity<>(addressService.listByUser(userId), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AddressResponseDTO> show(@PathVariable long id) {
        return new ResponseEntity<>(addressService.show(id), HttpStatus.OK);
    }
    
    @PutMapping
    public ResponseEntity<AddressResponseDTO> update(@RequestBody AddressUpdateDTO addressUpdateDTO) {
        return new ResponseEntity<>(addressService.update(addressUpdateDTO), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> destroy(@PathVariable long id) {
        addressService.destroy(id);
        return new ResponseEntity<>("Endereço removido com sucesso", HttpStatus.OK);
    }
}