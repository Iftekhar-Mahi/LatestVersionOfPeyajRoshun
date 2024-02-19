-- -- list of all tables \d
-- User Table
CREATE TABLE Users (
    UserID BIGSERIAL PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    RoadNo VARCHAR(50),
    HouseNo VARCHAR(50),
    City VARCHAR(100),
    District VARCHAR(100),
    Password VARCHAR(255) NOT NULL
);

-- Category Table

CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL,
    Description TEXT
);

-- Product Table
CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    QuantityInStock INT NOT NULL,
    Price INT NOT NULL,
    CategoryID INT REFERENCES Categories(CategoryID),
    ExpireDate DATE
);

-- Orders Table
CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    UserID BIGINT REFERENCES Users(UserID),
    DatePlaced DATE,
    Amount INT NOT NULL,
    PaymentMethod VARCHAR(50),
    PaymentStatus VARCHAR(50),
    DeliveryStatus VARCHAR(50)
);

-- Order Details Table
CREATE TABLE OrderDetails (
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Price INT NOT NULL,
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- ProductReview Table
CREATE TABLE ProductReview (
    UserID BIGINT,
    ProductID INT,
    Rating INT NOT NULL,
    Comment TEXT,
    PRIMARY KEY (UserID, ProductID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- OrderReview Table
CREATE TABLE OrderReview (
    UserID BIGINT,
    OrderID INT,
    Rating INT NOT NULL,
    Comment TEXT,
    PRIMARY KEY (UserID, OrderID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);


-- Promotions Table
CREATE TABLE Promotions (
    PromotionID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    CouponCode VARCHAR(50) UNIQUE,
    DiscountPercentage DECIMAL(5,2) NOT NULL,
    StartDate DATE,
    EndDate DATE
);

-- PromotionProduct Table
CREATE TABLE PromotionProduct (
    PromotionID INT,
    ProductID INT,
    DiscountPercentage DECIMAL(5,2) NOT NULL,
    PRIMARY KEY (PromotionID, ProductID),
    FOREIGN KEY (PromotionID) REFERENCES Promotions(PromotionID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);


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

-- Additional Products
INSERT INTO Products (Name, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Orange', 40, 2.0, 1, '2023-02-10'),
  ('Carrot', 25, 0.75, 2, '2023-02-05'),
  ('Cheese', 15, 4.5, 3, '2023-03-01'),
  ('Baguette', 20, 2.8, 4, '2023-01-28'),
  ('Salmon Fillet', 10, 12.0, 5, '2023-01-18'),
  ('Juice', 30, 3.0, 6, '2023-02-20'),
  ('Pretzels', 25, 1.2, 7, '2023-03-10'),
  ('Canned Soup', 20, 1.5, 8, '2023-02-28'),
  ('Quinoa', 15, 3.5, 9, '2023-02-15'),
  ('Window Cleaner', 8, 4.0, 10, '2023-01-20');
-- More Additional Products
INSERT INTO Products (Name, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Grapes', 35, 3.0, 1, '2023-02-15'),
  ('Broccoli', 20, 1.2, 2, '2023-02-08'),
  ('Yogurt', 25, 2.5, 3, '2023-03-05'),
  ('Croissant', 15, 2.2, 4, '2023-01-22'),
  ('Pork Chops', 12, 9.0, 5, '2023-01-25'),
  ('Iced Tea', 40, 1.75, 6, '2023-03-10'),
  ('Peanuts', 30, 1.0, 7, '2023-03-20'),
  ('Canned Corn', 18, 1.3, 8, '2023-02-15'),
  ('Pasta', 40, 2.0, 9, '2023-02-28'),
  ('Bathroom Cleaner', 12, 4.5, 10, '2023-01-10');
-- More Additional Products
INSERT INTO Products (Name, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Pineapple', 30, 4.5, 1, '2023-02-20'),
  ('Spinach', 18, 1.0, 2, '2023-02-12'),
  ('Butter', 20, 3.0, 3, '2023-03-08'),
  ('Bagel', 25, 1.8, 4, '2023-01-30'),
  ('Ground Beef', 15, 7.0, 5, '2023-01-18'),
  ('Lemonade', 35, 2.2, 6, '2023-03-15'),
  ('Popcorn', 22, 1.5, 7, '2023-03-05'),
  ('Canned Tuna', 18, 1.7, 8, '2023-02-28'),
  ('Quinoa Pasta', 20, 2.5, 9, '2023-02-28'),
  ('Glass Cleaner', 10, 4.0, 10, '2023-01-15');

  -- Additional Snacks
INSERT INTO Products (Name, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Potato Chips', 30, 1.5, 7, '2023-03-10'),
  ('Chocolate Bar', 25, 2.0, 7, '2023-02-28'),
  ('Trail Mix', 20, 3.0, 7, '2023-03-15'),
  ('Pretzel Sticks', 18, 1.2, 7, '2023-02-20'),
  ('Cheese Puffs', 22, 1.8, 7, '2023-03-05'),
  ('Granola Bars', 28, 2.5, 7, '2023-03-08'),
  ('Popcorn Bags', 24, 1.5, 7, '2023-02-25'),
  ('Dried Fruit Mix', 20, 2.2, 7, '2023-03-01'),
  ('Crackers', 30, 1.0, 7, '2023-03-20'),
  ('Nuts Assortment', 25, 3.5, 7, '2023-03-12'),
  ('Pita Chips', 18, 1.3, 7, '2023-02-18'),
  ('Rice Cakes', 22, 1.0, 7, '2023-02-22'),
  ('Candy Bars Variety', 26, 2.8, 7, '2023-03-25'),
  ('Sour Gummy Worms', 20, 1.7, 7, '2023-02-28'),
  ('Mixed Nuts', 15, 4.0, 7, '2023-03-10');
-- Additional Grains
INSERT INTO Products (Name, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Brown Rice', 30, 2.0, 9, '2023-02-28'),
  ('Quinoa', 25, 3.5, 9, '2023-03-05'),
  ('Whole Wheat Pasta', 20, 2.2, 9, '2023-02-22'),
  ('Barley', 18, 1.8, 9, '2023-02-20'),
  ('Couscous', 22, 1.5, 9, '2023-03-01'),
  ('Oats', 28, 2.5, 9, '2023-03-08'),
  ('Bulgur', 24, 1.7, 9, '2023-02-25');
-- Additional Bakery Items
INSERT INTO Products (Name, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Cinnamon Roll', 15, 2.5, 4, '2023-02-18'),
  ('Baguette', 20, 2.8, 4, '2023-02-20'),
  ('Blueberry Muffin', 18, 1.8, 4, '2023-02-22'),
  ('Sourdough Bread', 22, 3.0, 4, '2023-03-01'),
  ('Chocolate Croissant', 25, 2.2, 4, '2023-03-05'),
  ('Apple Danish', 28, 2.0, 4, '2023-03-08'),
  ('Whole Grain Bread', 24, 1.7, 4, '2023-02-25'),
  ('Pretzel', 20, 1.5, 4, '2023-03-10'),
  ('Almond Croissant', 15, 3.5, 4, '2023-03-15'),
  ('Cheese Danish', 18, 2.2, 4, '2023-03-20'),
  ('Rye Bread', 22, 1.5, 4, '2023-03-25'),
  ('Multigrain Bagel', 24, 1.8, 4, '2023-04-01');



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
