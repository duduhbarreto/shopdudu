package br.com.primeshoes.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.dtos.AddressCreateDTO;
import br.com.primeshoes.api.dtos.AddressResponseDTO;
import br.com.primeshoes.api.dtos.AddressUpdateDTO;
import br.com.primeshoes.api.entities.Address;
import br.com.primeshoes.api.entities.User;
import br.com.primeshoes.api.mappers.AddressMapper;
import br.com.primeshoes.api.repositories.AddressRepository;
import br.com.primeshoes.api.repositories.UserRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AddressMapper addressMapper;
    
    public AddressResponseDTO store(AddressCreateDTO addressCreateDTO) {
        Address address = addressMapper.toEntity(addressCreateDTO);
        return AddressMapper.toDTO(addressRepository.save(address));
    }
    
    public List<AddressResponseDTO> listByUser(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        return addressRepository.findByUser(user).stream()
                .map(AddressMapper::toDTO)
                .toList();
    }
    
    public AddressResponseDTO show(long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        
        return AddressMapper.toDTO(address);
    }
    
    public AddressResponseDTO update(AddressUpdateDTO addressUpdateDTO) {
        Address address = addressRepository.findById(addressUpdateDTO.id())
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        
        address.setStreet(addressUpdateDTO.street());
        address.setNumber(addressUpdateDTO.number());
        address.setNeighborhood(addressUpdateDTO.neighborhood());
        address.setCity(addressUpdateDTO.city());
        address.setState(addressUpdateDTO.state());
        address.setComplement(addressUpdateDTO.complement());
        address.setZipcode(addressUpdateDTO.zipcode());
        
        return AddressMapper.toDTO(addressRepository.save(address));
    }
    
    public void destroy(long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        
        addressRepository.delete(address);
    }
}