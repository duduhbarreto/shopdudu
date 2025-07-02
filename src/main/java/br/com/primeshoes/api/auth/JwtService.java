package br.com.primeshoes.api.auth;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import br.com.primeshoes.api.entities.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	
	private final String key = "e3d61b26826bfc6721075eb261df9be8e56a8d6a1626914eb76ef7b48777d7be3519ca91c46271ad14d75c6b35fb7196252d3918ad60db666b4f9290db47835ecdf44c52defffef4bdb840c11ce71abe299d0705103940c4c79a8d6f816c3ecf5a358e4f5760596291df4daf6dfcd871d4e505e6b5f2baf2594a1d754461397af9919219162b18f8630a8b3b2961fa147a889f8ca7cf65a289874f9bc8773aabe1d44a555bac58a636d0b0b8666c78915ae98ffb7bb7a0edfc814f4c12093925af621ee195393aad098433970103b30e7e78567ee75cc8bb6e49b347bc71b0576015459315efad52fc30527c6d45333399cda00ac22f4f3662087dfab9b75249";
	private final SecretKey secret = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
	
	public String generateToken(User user) {
		return Jwts
				.builder()
				.claim("name", user.getName())
				.claim("role", user.getRole())
				.claims()
				.subject(user.getEmail())
				.and()
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + 86400000))
				.signWith(secret)
				.compact();
	}
	
	public String extractEmail(String token) {
		return Jwts
				.parser()
				.verifyWith(secret)
				.build()
				.parseSignedClaims(token)
				.getPayload()
				.getSubject();
	}
	
	public boolean isValid(String token, UserDetails user) {
		return extractEmail(token).equals(user.getUsername());
	}
	
}



















