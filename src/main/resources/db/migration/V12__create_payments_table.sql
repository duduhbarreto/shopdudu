CREATE TABLE payments(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	order_id BIGINT,
	payment_method VARCHAR(255),
	amount NUMERIC(15,2),
	status VARCHAR(20),
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	FOREIGN KEY(order_id) REFERENCES orders(id)
);