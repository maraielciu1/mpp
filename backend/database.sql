
CREATE DATABASE my_marketplace;
-- users table
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username TEXT NOT NULL,
                       email Text not null,
                       password text not null,
                       is_admin BOOLEAN DEFAULT FALSE
);

-- products table
CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name TEXT NOT NULL,
                          description TEXT NOT NULL,
                          price NUMERIC(10,2) NOT NULL,
                          category TEXT NOT NULL,
                          sub_category TEXT NOT NULL,
                          bestseller BOOLEAN DEFAULT FALSE,
                          user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

-- product_images table
CREATE TABLE product_images (
                                id SERIAL PRIMARY KEY,
                                product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
                                url TEXT NOT NULL
);

-- product_sizes table
CREATE TABLE product_sizes (
                               id SERIAL PRIMARY KEY,
                               product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
                               size TEXT NOT NULL
);

--
-- drop table product_images;
-- drop table product_sizes;
-- drop table offers;
-- drop table products;
-- drop table users;
-- offers
CREATE TABLE offers (
                        id SERIAL PRIMARY KEY,
                        amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
                        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
                        sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- delete from users;
INSERT INTO users (username, email, password, is_admin) VALUES
                                           ('user1', 'user1@example.com', '1234',FALSE),
                                           ('admin', 'admin@example.com', '1234',TRUE),
                                           ('user2', 'user2@example.com', '1234',FALSE);
select * from users;

-- Insert into products
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller)
VALUES (1, 1, 'Grey Boy Blouse', 'A lightweight, long-sleeve grey blouse with an animated design.', 50, 'Kids', 'Topwear', TRUE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller)
VALUES (2, 1, 'Orange Boy Blouse', 'A lightweight, long-sleeve orange blouse with cool message.', 50, 'Kids', 'Topwear', FALSE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller)
VALUES (3, 1, 'Set with 2 Girl Blouses', 'A set of two lightweight, long-sleeve blouses for girls, perfect for any occasion.', 80, 'Kids', 'Topwear', TRUE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller)
VALUES (4, 1, 'Blue Men''s Blouse', 'A smart casual blue blouse for men, made from breathable fabric.', 70, 'Men', 'Topwear', FALSE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller)
VALUES (5, 1, 'Classic Men''s Shirt', 'A stylish and comfortable shirt for everyday wear.', 65, 'Men', 'Topwear', TRUE);

-- Insert product images
INSERT INTO product_images (product_id, url) VALUES (1, 'https://i.pinimg.com/736x/d1/c3/9f/d1c39f353716952e97fbff29470d9aeb.jpg');
INSERT INTO product_images (product_id, url) VALUES (2, 'https://i.pinimg.com/736x/0e/9d/ee/0e9dee52b0b5ee5412a90f9aefbb5a61.jpg');
INSERT INTO product_images (product_id, url) VALUES (3, 'https://i.pinimg.com/736x/74/41/1d/74411dc5bf1a19b5635c12aa9d8779e0.jpg');
INSERT INTO product_images (product_id, url) VALUES (4, 'https://i.pinimg.com/736x/1e/11/ec/1e11eccf41da44dcd106739ebf1dc893.jpg');
INSERT INTO product_images (product_id, url) VALUES (5, 'https://i.pinimg.com/736x/30/39/1b/30391b10d031236d84adcfc04ca4b5b7.jpg');

-- Insert product sizes
INSERT INTO product_sizes (product_id, size) VALUES (1, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (1, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (1, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (1, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (2, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (2, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (2, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (2, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (3, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (3, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (3, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (3, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (4, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (4, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (4, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (5, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (5, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (5, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (5, 'XL');

-- Insert offers
INSERT INTO offers (product_id, sender_id, amount, created_at) VALUES (1, 2, 45, NOW());
INSERT INTO offers (product_id, sender_id, amount, created_at) VALUES (2, 2, 40, NOW());
INSERT INTO offers (product_id, sender_id, amount, created_at) VALUES (4, 2, 60, NOW());
INSERT INTO offers (product_id, sender_id, amount, created_at) VALUES (5, 2, 55, NOW());


-- Products
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (6, 2, 'Men''s Winter Jacket', 'A warm and waterproof winter jacket for men.', 120, 'Men', 'Outerwear', TRUE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (7, 2, 'Men''s Slim Fit Jeans', 'Dark-washed, slim-fit jeans designed for a modern look.', 90, 'Men', 'Bottomwear', FALSE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (8, 2, 'Men''s Casual Jeans', 'Light-blue denim jeans for casual everyday wear.', 85, 'Men', 'Bottomwear', FALSE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (9, 2, 'Men''s Black Vest', 'A sleek, sleeveless vest perfect for layering or formal wear.', 60, 'Men', 'Topwear', TRUE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (10, 2, 'Women''s White Blouse', 'Elegant white blouse suitable for both casual and formal settings.', 55, 'Women', 'Topwear', FALSE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (11, 2, 'Women''s Peach Blouse', 'Chic and soft peach blouse that pairs well with jeans or skirts.', 60, 'Women', 'Topwear', TRUE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (12, 2, 'Women''s Quilted Jacket', 'A cozy quilted jacket for cold weather outings.', 110, 'Women', 'Outerwear', FALSE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (13, 2, 'Women''s Brown Jacket', 'A stylish brown jacket with a modern cut and soft lining.', 105, 'Women', 'Outerwear', TRUE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (14, 2, 'Women''s Skinny Jeans', 'Figure-hugging skinny jeans made with stretchy denim for comfort.', 75, 'Women', 'Bottomwear', FALSE);
INSERT INTO products (id, user_id, name, description, price, category, sub_category, bestseller) VALUES (15, 2, 'Women''s High-Waisted Jeans', 'Trendy high-waisted jeans with a flattering silhouette.', 80, 'Women', 'Bottomwear', TRUE);

-- Images
INSERT INTO product_images (product_id, url) VALUES (6, 'https://i.pinimg.com/736x/1a/33/c4/1a33c4a5d0993a492b9cf8fdfd0d0bc1.jpg');
INSERT INTO product_images (product_id, url) VALUES (7, 'https://i.pinimg.com/736x/6d/15/e6/6d15e626cf5928bc99541887ca4cd29d.jpg');
INSERT INTO product_images (product_id, url) VALUES (8, 'https://i.pinimg.com/736x/2b/c2/0c/2bc20cd43f6f40b6928fb098c81004c3.jpg');
INSERT INTO product_images (product_id, url) VALUES (9, 'https://i.pinimg.com/736x/f3/2d/90/f32d90b4e5fa2726539e0148f5a47f88.jpg');
INSERT INTO product_images (product_id, url) VALUES (10, 'https://i.pinimg.com/736x/fc/ef/85/fcef85eb6d9bf389394d3d3adaec6532.jpg');
INSERT INTO product_images (product_id, url) VALUES (11, 'https://i.pinimg.com/736x/a6/0a/5c/a60a5ccc2663a3ae5fc8c4858d699619.jpg');
INSERT INTO product_images (product_id, url) VALUES (12, 'https://i.pinimg.com/736x/66/31/37/6631370f3e1c15f9027246fb0b155e3a.jpg');
INSERT INTO product_images (product_id, url) VALUES (13, 'https://i.pinimg.com/736x/a1/9b/15/a19b159da84cff50900447c6de8750c3.jpg');
INSERT INTO product_images (product_id, url) VALUES (14, 'https://i.pinimg.com/736x/5f/df/6e/5fdf6e6e82762523647308334ee61b65.jpg');
INSERT INTO product_images (product_id, url) VALUES (15, 'https://i.pinimg.com/736x/ae/6d/6d/ae6d6d1eb87eb49f5a56274e22ed7b78.jpg');

-- Sizes
INSERT INTO product_sizes (product_id, size) VALUES (6, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (6, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (6, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (7, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (7, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (7, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (7, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (8, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (8, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (8, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (9, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (9, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (9, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (10, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (10, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (10, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (10, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (11, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (11, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (11, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (12, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (12, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (12, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (13, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (13, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (13, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (13, 'XL');
INSERT INTO product_sizes (product_id, size) VALUES (14, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (14, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (14, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (15, 'S');
INSERT INTO product_sizes (product_id, size) VALUES (15, 'M');
INSERT INTO product_sizes (product_id, size) VALUES (15, 'L');
INSERT INTO product_sizes (product_id, size) VALUES (15, 'XL');

select * from users;

-- Offers from user 2 (demo_user2) to user 1's products
INSERT INTO offers (product_id, sender_id, amount) VALUES (1, 3, 45.00);
INSERT INTO offers (product_id, sender_id, amount) VALUES (2, 3, 47.00);
INSERT INTO offers (product_id, sender_id, amount) VALUES (3, 3, 70.00);
INSERT INTO offers (product_id, sender_id, amount) VALUES (4, 3, 60.00);

-- Offers from user 1 (demo_user) to user 2's products
INSERT INTO offers (product_id, sender_id, amount) VALUES (6, 1, 100.00);
INSERT INTO offers (product_id, sender_id, amount) VALUES (7, 1, 85.00);
INSERT INTO offers (product_id, sender_id, amount) VALUES (11, 1, 55.00);
INSERT INTO offers (product_id, sender_id, amount) VALUES (15, 1, 75.00);