CREATE TABLE orders(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	user_id BIGINT,
	total_price NUMERIC(15,2),
	status VARCHAR(20),
	payment_method VARCHAR(255),
	tarcking_code VARCHAR(255),
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES users(id)
);