CREATE TABLE reviews(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	user_id BIGINT,
	variation_id BIGINT,
	rating float,
	comment VARCHAR(255),
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(variation_id) REFERENCES product_variations(id)
);