CREATE TABLE carts(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	user_id BIGINT,
	created_at datetime,
	updated_at datetime,
	FOREIGN KEY(user_id) REFERENCES users(id)	
);