CREATE TABLE product_variations(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	product_id BIGINT,
	color VARCHAR(7),
	size VARCHAR(4),
	stock int,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	FOREIGN KEY(product_id) REFERENCES products(id)	
);