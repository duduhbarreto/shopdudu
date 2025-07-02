package br.com.primeshoes.api.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.entities.User;
import br.com.primeshoes.api.repositories.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	private final UserRepository repository;
	
	public UserDetailsServiceImpl(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = repository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
		return user;
	}
}