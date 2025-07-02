CREATE TABLE order_items(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	order_id BIGINT,
	variation_id BIGINT,
	quantity int,
	subtotal float,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	FOREIGN KEY(order_id) REFERENCES orders(id),
	FOREIGN KEY(variation_id) REFERENCES product_variations(id)
);