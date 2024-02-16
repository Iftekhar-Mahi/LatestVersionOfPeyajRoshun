-- -- list of all tables \d

-- CREATE TABLE products(
--     id INT,
--     name VARCHAR(50),
--     price INT,
--     on_sale boolean

-- );

-- CREATE TABLE restaurants(
--     id BIGSERIAL NOT NULL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     location VARCHAR(50)NOT NULL,
--     price_range INT NOT NULL check(price_range>= 1 and price_range<=5)
-- );

-- INSERT INTO restaurants(id,name,location,price_range)
-- values(123,'mcdonalds','newyorks',3);

-- Users Table
INSERT INTO Users (FirstName, LastName, Email, RoadNo, HouseNo, City, District, Password)
VALUES
  ('John', 'Doe', 'john.doe@email.com', '123', '456', 'CityA', 'DistrictX', 'password123'),
  ('Alice', 'Smith', 'alice.smith@email.com', '789', '101', 'CityB', 'DistrictY', 'password456'),
  ('Bob', 'Johnson', 'bob.johnson@email.com', '456', '789', 'CityC', 'DistrictZ', 'password789'),
  ('Eva', 'Williams', 'eva.williams@email.com', '101', '202', 'CityD', 'DistrictW', 'passwordABC'),
  ('David', 'Brown', 'david.brown@email.com', '303', '505', 'CityE', 'DistrictV', 'passwordDEF'),
  ('Sophia', 'Miller', 'sophia.miller@email.com', '606', '707', 'CityF', 'DistrictU', 'passwordGHI'),
  ('James', 'Davis', 'james.davis@email.com', '909', '808', 'CityG', 'DistrictT', 'passwordJKL'),
  ('Emma', 'Taylor', 'emma.taylor@email.com', '404', '606', 'CityH', 'DistrictS', 'passwordMNO'),
  ('Michael', 'Clark', 'michael.clark@email.com', '707', '404', 'CityI', 'DistrictR', 'passwordPQR'),
  ('Olivia', 'Moore', 'olivia.moore@email.com', '808', '909', 'CityJ', 'DistrictQ', 'passwordSTU');

-- Categories Table
INSERT INTO Categories (CategoryName, Description)
VALUES
  ('Fruits', 'Fresh and delicious fruits'),
  ('Vegetables', 'A variety of fresh vegetables'),
  ('Dairy', 'Milk, cheese, and other dairy products'),
  ('Bakery', 'Freshly baked goods'),
  ('Meat', 'Various types of meat'),
  ('Beverages', 'A range of beverages'),
  ('Snacks', 'Snacks and finger foods'),
  ('Canned Goods', 'Canned and preserved items'),
  ('Grains', 'Rice, pasta, and grains'),
  ('Cleaning Supplies', 'Household cleaning supplies');

-- Products Table
INSERT INTO Products (Name, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Apple', 50, 2.5, 1, '2023-01-31'),
  ('Banana', 30, 1.0, 1, '2023-01-30'),
  ('Milk', 20, 3.5, 3, '2023-02-15'),
  ('Bread', 25, 2.0, 4, '2023-01-25'),
  ('Chicken Breast', 15, 8.0, 5, '2023-01-20'),
  ('Soda', 40, 1.5, 6, '2023-02-28'),
  ('Chips', 35, 1.8, 7, '2023-03-15'),
  ('Canned Beans', 18, 1.2, 8, '2023-02-10'),
  ('Rice', 50, 2.2, 9, '2023-01-31'),
  ('All-Purpose Cleaner', 10, 5.0, 10, '2023-01-15');

-- Orders Table
INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES
  (1, '2023-01-15', 20, 'Credit Card', 'Paid', 'Delivered'),
  (2, '2023-01-16', 15, 'PayPal', 'Paid', 'Processing'),
  (3, '2023-01-20', 30, 'Cash On Delivery', 'Pending', 'Shipped'),
  (4, '2023-01-25', 25, 'Credit Card', 'Paid', 'Delivered'),
  (5, '2023-02-01', 40, 'PayPal', 'Paid', 'Processing'),
  (6, '2023-02-05', 15, 'Credit Card', 'Paid', 'Delivered'),
  (7, '2023-02-10', 18, 'PayPal', 'Paid', 'Processing'),
  (8, '2023-02-15', 22, 'Credit Card', 'Paid', 'Delivered'),
  (9, '2023-02-20', 16, 'PayPal', 'Paid', 'Processing'),
  (10, '2023-02-25', 28, 'Credit Card', 'Paid', 'Delivered');


-- OrderDetails Table
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price)
VALUES
  (1, 1, 2, 5.0),
  (1, 2, 3, 3.0),
  (2, 3, 1, 3.5),
  (3, 4, 2, 2.0),
  (4, 5, 1, 8.0),
  (5, 6, 4, 1.5),
  (6, 7, 2, 1.8),
  (7, 8, 3, 1.2),
  (8, 9, 2, 2.2),
  (9, 10, 1, 5.0);

-- ProductReview Table
INSERT INTO ProductReview (UserID, ProductID, Rating, Comment)
VALUES
  (1, 1, 4, 'Great taste!'),
  (2, 2, 5, 'Excellent quality'),
  (3, 3, 3, 'Decent, but could be better'),
  (4, 4, 4, 'Fresh and delicious'),
  (5, 5, 5, 'High-quality meat'),
  (6, 6, 4, 'Love the variety of beverages'),
  (7, 7, 3, 'Good, but a bit too salty'),
  (8, 8, 5, 'Canned beans are a pantry staple'),
  (9, 9, 4, 'Good quality rice'),
  (10, 10, 5, 'Effective cleaner for the home');

-- OrderReview Table
INSERT INTO OrderReview (UserID, OrderID, Rating, Comment)
VALUES
  (1, 1, 4, 'Fast delivery, good service'),
  (2, 2, 3, 'Some items were missing'),
  (3, 3, 5, 'Perfect order, everything included'),
  (4, 4, 4, 'Timely delivery and well-packaged'),
  (5, 5, 3, 'Slight delay in delivery, but good overall'),
  (6, 6, 5, 'Excellent service and communication'),
  (7, 7, 2, 'Late delivery and missing snacks'),
  (8, 8, 4, 'Quick delivery, no issues'),
  (9, 9, 5, 'Very satisfied with the order'),
  (10, 10, 3, 'Some products were close to expiry');

-- Promotions Table
INSERT INTO Promotions (Name, Description, CouponCode, DiscountPercentage, StartDate, EndDate)
VALUES
  ('SpringSale', 'Special discounts for spring', 'SPRING2023', 15.0, '2023-03-01', '2023-03-15'),
  ('WeekendDeal', 'Exclusive deals for the weekend', 'WEEKEND', 10.0, '2023-02-24', '2023-02-26'),
  ('HolidaySpecial', 'Holiday season discounts', 'HOLIDAY2023', 20.0, '2023-12-01', '2023-12-31'),
  ('BackToSchool', 'Deals for back-to-school season', 'SCHOOL2023', 12.0, '2023-08-15', '2023-09-15'),
  ('SummerClearance', 'Clearance sale for summer', 'SUMMERCLEAR', 25.0, '2023-06-01', '2023-06-15'),
  ('BlackFriday', 'Black Friday discounts', 'BLACKFRI2023', 30.0, '2023-11-24', '2023-11-27'),
  ('CyberMonday', 'Cyber Monday online deals', 'CYBERMON2023', 18.0, '2023-11-27', '2023-11-30'),
  ('AnniversarySale', 'Celebrating our anniversary', 'ANNIV2023', 15.0, '2023-04-10', '2023-04-20'),
  ('WinterWarmth', 'Winter essentials at discounted prices', 'WINTER2023', 12.0, '2023-12-15', '2023-12-31'),
  ('NewProductLaunch', 'Special promotion for new products', 'NEWLAUNCH', 10.0, '2023-02-15', '2023-02-28');


-- PromotionProduct Table
INSERT INTO PromotionProduct (PromotionID, ProductID, DiscountPercentage)
VALUES
  (1, 1, 10.0),
  (2, 2, 5.0),
  (3, 3, 15.0),
  (4, 4, 8.0),
  (5, 5, 20.0),
  (6, 6, 25.0),
  (7, 7, 12.0),
  (8, 8, 18.0),
  (9, 9, 10.0),
  (10, 10, 15.0);

-- Users Table
SELECT * FROM Users;

-- Categories Table
SELECT * FROM Categories;

-- Products Table
SELECT * FROM Products;

-- Orders Table
SELECT * FROM Orders;

-- OrderDetails Table
SELECT * FROM OrderDetails;

-- ProductReview Table
SELECT * FROM ProductReview;

-- OrderReview Table
SELECT * FROM OrderReview;

-- Promotions Table
SELECT * FROM Promotions;

-- PromotionProduct Table
SELECT * FROM PromotionProduct;
