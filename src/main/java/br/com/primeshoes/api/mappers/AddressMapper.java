package br.com.primeshoes.api.mappers;

import org.springframework.stereotype.Component;

import br.com.primeshoes.api.dtos.AddressCreateDTO;
import br.com.primeshoes.api.dtos.AddressResponseDTO;
import br.com.primeshoes.api.entities.Address;
import br.com.primeshoes.api.entities.User;
import br.com.primeshoes.api.repositories.UserRepository;

@Component
public class AddressMapper {

    private final UserRepository userRepository;
    
    public AddressMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public Address toEntity(AddressCreateDTO addressCreateDTO) {
        User user = userRepository.findById(addressCreateDTO.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        Address address = new Address();
        address.setStreet(addressCreateDTO.street());
        address.setNumber(addressCreateDTO.number());
        address.setNeighborhood(addressCreateDTO.neighborhood());
        address.setCity(addressCreateDTO.city());
        address.setState(addressCreateDTO.state());
        address.setComplement(addressCreateDTO.complement());
        address.setZipcode(addressCreateDTO.zipcode());
        address.setUser(user);
        
        return address;
    }
    
    public static AddressResponseDTO toDTO(Address address) {
        return new AddressResponseDTO(
            address.getId(),
            address.getStreet(),
            address.getNumber(),
            address.getNeighborhood(),
            address.getCity(),
            address.getState(),
            address.getComplement(),
            address.getZipcode(),
            UserMapper.toDTO(address.getUser()),
            address.getCreatedAt(),
            address.getUpdatedAt()
        );
    }
}