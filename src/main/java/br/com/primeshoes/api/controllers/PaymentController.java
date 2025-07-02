package br.com.primeshoes.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.payment.PaymentCreateRequest;
import com.mercadopago.client.payment.PaymentPayerRequest;
import com.mercadopago.resources.payment.Payment;

import br.com.primeshoes.api.dtos.MPPaymentDTO;
import br.com.primeshoes.api.dtos.PaymentCreateDTO;
import br.com.primeshoes.api.dtos.PaymentResponseDTO;
import br.com.primeshoes.api.services.PaymentService;
import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

	
	@Autowired
	PaymentService paymentService;
	
	@Value("${mp.key}") private String mpKey; 
	
	@PostConstruct
	public void init() {
		MercadoPagoConfig.setAccessToken(mpKey);
	}
		
	@PostMapping
	public ResponseEntity<PaymentResponseDTO> store(@RequestBody PaymentCreateDTO paymentCreateDTO){
		return new ResponseEntity<>(paymentService.store(paymentCreateDTO), HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<PaymentResponseDTO>> list(){
		return new ResponseEntity<>(paymentService.list(), HttpStatus.OK);
	}
	
	@GetMapping("/show/{id}")
	public ResponseEntity<PaymentResponseDTO> show(@PathVariable long id){
		return new ResponseEntity<>(paymentService.show(id), HttpStatus.OK);
	}
	
	@DeleteMapping("/destroy/{id}")
	public ResponseEntity<String> destroy(@PathVariable long id) {
		paymentService.destroy(id);
		
		return new ResponseEntity<>("Pagamento deletado com sucesso", HttpStatus.OK);
	}
	
	@PostMapping("/pay")
	public ResponseEntity<?> processPayment(@RequestBody MPPaymentDTO paymentDTO){
		
		try {
			
			PaymentClient client = new PaymentClient();
			
			PaymentCreateRequest request = PaymentCreateRequest
					.builder()
					.transactionAmount(paymentDTO.amount())
					.token(paymentDTO.token())
					.description(paymentDTO.description())
					.installments(paymentDTO.installments())
					.paymentMethodId(paymentDTO.paymentMethodId())
					.payer(
							PaymentPayerRequest.builder()
							.email(paymentDTO.email())
							.identification(
									IdentificationRequest.builder()
									.type("CPF")
									.number(paymentDTO.cpf())
									.build()
									).build()
							).build();
			
			Payment payment = client.create(request);
			
			return ResponseEntity.status(HttpStatus.OK).body(payment);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(e.getMessage());
		}
		
	}
	
}
