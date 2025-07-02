CREATE TABLE products(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	description VARCHAR(255),
	price NUMERIC(15,2),
	category_id BIGINT,
	brand_id BIGINT,
	image_url VARCHAR(255),
	rating FLOAT,
	user_id BIGINT,
	created_at datetime,
	updated_at datetime,
	FOREIGN KEY(category_id) REFERENCES categories(id),
	FOREIGN KEY(brand_id) REFERENCES brands(id),
	FOREIGN KEY(user_id) REFERENCES users(id)
);