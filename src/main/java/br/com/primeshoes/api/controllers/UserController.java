package br.com.primeshoes.api.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.primeshoes.api.auth.JwtService;
import br.com.primeshoes.api.dtos.AuthDTO;
import br.com.primeshoes.api.dtos.UserCreateDTO;
import br.com.primeshoes.api.dtos.UserResponseDTO;
import br.com.primeshoes.api.dtos.UserUpdateDTO;
import br.com.primeshoes.api.entities.User;
import br.com.primeshoes.api.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;
	
	public UserController(AuthenticationManager authenticationManager, JwtService jwtService) {
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
	}
	
	@PostMapping("/auth")
	public ResponseEntity<?> auth(@RequestBody AuthDTO authDTO){
		
		
		
		Authentication auth = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authDTO.email(), authDTO.password())); 
		
		User user = (User) auth.getPrincipal();
		String token = jwtService.generateToken(user);
		
		return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> store(@RequestBody UserCreateDTO userCreateDTO) throws Exception {
		try {
			return new ResponseEntity<>(userService.store(userCreateDTO), HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_GATEWAY);
		}
	}

	@GetMapping
	public ResponseEntity<List<UserResponseDTO>> list() {
		return new ResponseEntity<>(userService.list(), HttpStatus.OK);
	}

	@GetMapping("/show/{id_user}")
	public ResponseEntity<?> show(@PathVariable long id_user) {
		return new ResponseEntity<>(userService.show(id_user), HttpStatus.OK);
	}

	@PatchMapping
	public ResponseEntity<UserResponseDTO> update(@RequestBody UserUpdateDTO userUpdateDTO) {
		return new ResponseEntity<>(userService.update(userUpdateDTO), HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id_user}")
	public ResponseEntity<String> destroy(@PathVariable long id_user) {
		userService.destroy(id_user);
		return new ResponseEntity<>("Usuário deletado com sucesso.", HttpStatus.OK);
	}
	@GetMapping("/show/me")
	public ResponseEntity<?> showCurrentUser() {
		User user = config.getAuthUser();
		if (user == null) {
			return new ResponseEntity<>("Usuário não autenticado", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(userService.show(user.getId()), HttpStatus.OK);
	}
		@Autowired
	private SecurityConfig config;
}
