CREATE TABLE cart_items(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	cart_id BIGINT,
	variation_id BIGINT,
	quantity INT,
	subtotal NUMERIC(15,2),
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	FOREIGN KEY(cart_id) REFERENCES carts(id),
	FOREIGN KEY(variation_id) REFERENCES product_variations(id)	
);