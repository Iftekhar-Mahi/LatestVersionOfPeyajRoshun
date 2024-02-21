-- -- list of all tables \d
-- User Table

drop database peyajroshun;
Create database peyajroshun;
    UserID BIGSERIAL PRIMARY KEY,
    FiCREATE TABLE Users (
rstName VARCHAR(255) NOT NULL,
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
    Description VARCHAR(255) NOT NULL,
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


--Create table for Cart

CREATE TABLE Cart (
    CartID SERIAL PRIMARY KEY,
    UserID BIGINT REFERENCES Users(UserID),
    ProductID INT REFERENCES Products(ProductID),
    Quantity INT NOT NULL
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
  ('Michael', 'Clark', 'michael.clark@email.com', '707', '404', 'CityI', 'DistrictR', 'passwordPQR');


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
  ('Cleaning Supplies', 'Household cleaning supplies'),
  ('Condiments', 'Sauces, spices, and seasonings'),
  ('Frozen Foods', 'Frozen meals and ingredients'),
  ('Personal Care', 'Personal care and hygiene products');

-- Products Table

INSERT INTO Products (Name, Description, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Apple', 'Fresh and juicy apple', 50, 2.5, 1, '2023-01-31'),
  ('Banana', 'Yellow and nutritious banana', 30, 1.0, 1, '2023-01-30'),
  ('Milk', 'Creamy and nutritious milk', 20, 3.5, 3, '2023-02-15'),
  ('Bread', 'Freshly baked bread', 25, 2.0, 4, '2023-01-25'),
  ('Chicken Breast', 'Lean and tender chicken breast', 15, 8.0, 5, '2023-01-20'),
  ('Soda', 'Refreshing carbonated beverage', 40, 1.5, 6, '2023-02-28'),
  ('Chips', 'Crunchy and savory chips', 35, 1.8, 7, '2023-03-15'),
  ('Canned Beans', 'Canned beans for convenience', 18, 1.2, 8, '2023-02-10'),
  ('Rice', 'High-quality rice grains', 50, 2.2, 9, '2023-01-31'),
  ('All-Purpose Cleaner', 'Versatile cleaning solution', 10, 5.0, 10, '2023-01-15');
INSERT INTO Products (Name, Description, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Cinnamon Roll', 'Sweet and aromatic cinnamon roll', 15, 2.5, 4, '2023-02-18'),
  ('Baguette', 'Crusty and flavorful baguette', 20, 2.8, 4, '2023-02-20'),
  ('Blueberry Muffin', 'Moist and fruity blueberry muffin', 18, 1.8, 4, '2023-02-22'),
  ('Sourdough Bread', 'Tangy and chewy sourdough bread', 22, 3.0, 4, '2023-03-01'),
  ('Chocolate Croissant', 'Buttery and chocolate-filled croissant', 25, 2.2, 4, '2023-03-05'),
  ('Apple Danish', 'Flaky and apple-filled danish', 28, 2.0, 4, '2023-03-08'),
  ('Whole Grain Bread', 'Nutritious and wholesome whole grain bread', 24, 1.7, 4, '2023-02-25'),
  ('Pretzel', 'Crunchy and salty pretzel', 20, 1.5, 4, '2023-03-10'),
  ('Almond Croissant', 'Buttery and almond-filled croissant', 15, 3.5, 4, '2023-03-15'),
  ('Cheese Danish', 'Flaky and cheese-filled danish', 18, 2.2, 4, '2023-03-20'),
  ('Rye Bread', 'Hearty and flavorful rye bread', 22, 1.5, 4, '2023-03-25'),
  ('Multigrain Bagel', 'Nutritious and multigrain bagel', 24, 1.8, 4, '2023-04-01');
-- Vegetable Items
-- Additional Products
INSERT INTO Products (Name, Description, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Orange', 'Juicy and refreshing orange', 40, 2.0, 1, '2023-02-10'),
  ('Carrot', 'Fresh and nutritious carrot', 25, 0.75, 2, '2023-02-05'),
  ('Cheese', 'Delicious and creamy cheese', 15, 4.5, 3, '2023-03-01'),
  ('Baguette', 'Crusty and flavorful baguette', 20, 2.8, 4, '2023-01-28'),
  ('Salmon Fillet', 'Fresh and tender salmon fillet', 10, 12.0, 5, '2023-01-18'),
  ('Juice', 'Refreshing and flavorful juice', 30, 3.0, 6, '2023-02-20'),
  ('Pretzels', 'Crunchy and salty pretzels', 25, 1.2, 7, '2023-03-10'),
  ('Canned Soup', 'Convenient and tasty canned soup', 20, 1.5, 8, '2023-02-28'),
  ('Quinoa', 'Healthy and nutritious quinoa', 15, 3.5, 9, '2023-02-15'),
  ('Window Cleaner', 'Effective and versatile window cleaner', 8, 4.0, 10, '2023-01-20');
-- More Additional Products
INSERT INTO Products (Name, Description, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Grapes', 'Sweet and juicy grapes', 35, 3.0, 1, '2023-02-15'),
  ('Broccoli', 'Nutritious and versatile broccoli', 20, 1.2, 2, '2023-02-08'),
  ('Yogurt', 'Creamy and probiotic-rich yogurt', 25, 2.5, 3, '2023-03-05'),
  ('Croissant', 'Buttery and flaky croissant', 15, 2.2, 4, '2023-01-22'),
  ('Pork Chops', 'Tender and flavorful pork chops', 12, 9.0, 5, '2023-01-25'),
  ('Iced Tea', 'Refreshing and thirst-quenching iced tea', 40, 1.75, 6, '2023-03-10'),
  ('Peanuts', 'Crunchy and protein-packed peanuts', 30, 1.0, 7, '2023-03-20'),
  ('Canned Corn', 'Sweet and delicious canned corn', 18, 1.3, 8, '2023-02-15'),
  ('Pasta', 'Versatile and satisfying pasta', 40, 2.0, 9, '2023-02-28'),
  ('Bathroom Cleaner', 'Effective and convenient bathroom cleaner', 12, 4.5, 10, '2023-01-10');
-- More Additional Products
INSERT INTO Products (Name, Description, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Pineapple', 'Sweet and tropical pineapple', 30, 4.5, 1, '2023-02-20'),
  ('Spinach', 'Nutritious and leafy spinach', 18, 1.0, 2, '2023-02-12'),
  ('Butter', 'Creamy and rich butter', 20, 3.0, 3, '2023-03-08'),
  ('Bagel', 'Soft and chewy bagel', 25, 1.8, 4, '2023-01-30'),
  ('Ground Beef', 'High-quality and flavorful ground beef', 15, 7.0, 5, '2023-01-18'),
  ('Lemonade', 'Refreshing and tangy lemonade', 35, 2.2, 6, '2023-03-15'),
  ('Popcorn', 'Crunchy and savory popcorn', 22, 1.5, 7, '2023-03-05'),
  ('Canned Tuna', 'Flaky and versatile canned tuna', 18, 1.7, 8, '2023-02-28'),
  ('Quinoa Pasta', 'Gluten-free and nutritious quinoa pasta', 20, 2.5, 9, '2023-02-28'),
  ('Glass Cleaner', 'Streak-free and effective glass cleaner', 10, 4.0, 10, '2023-01-15');

  -- Additional Snacks
INSERT INTO Products (Name, Description, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Potato Chips', 'Crunchy and flavorful potato chips', 30, 1.5, 7, '2023-03-10'),
  ('Chocolate Bar', 'Rich and indulgent chocolate bar', 25, 2.0, 7, '2023-02-28'),
  ('Trail Mix', 'Nutty and energizing trail mix', 20, 3.0, 7, '2023-03-15'),
  ('Pretzel Sticks', 'Crunchy and salty pretzel sticks', 18, 1.2, 7, '2023-02-20'),
  ('Cheese Puffs', 'Cheesy and addictive cheese puffs', 22, 1.8, 7, '2023-03-05'),
  ('Granola Bars', 'Healthy and satisfying granola bars', 28, 2.5, 7, '2023-03-08'),
  ('Popcorn Bags', 'Convenient and microwaveable popcorn bags', 24, 1.5, 7, '2023-02-25'),
  ('Dried Fruit Mix', 'Sweet and chewy dried fruit mix', 20, 2.2, 7, '2023-03-01'),
  ('Crackers', 'Crispy and versatile crackers', 30, 1.0, 7, '2023-03-20'),
  ('Nuts Assortment', 'Assortment of flavorful nuts', 25, 3.5, 7, '2023-03-12'),
  ('Pita Chips', 'Crunchy and savory pita chips', 18, 1.3, 7, '2023-02-18'),
  ('Rice Cakes', 'Light and crispy rice cakes', 22, 1.0, 7, '2023-02-22'),
  ('Candy Bars Variety', 'Variety pack of delicious candy bars', 26, 2.8, 7, '2023-03-25'),
  ('Sour Gummy Worms', 'Tangy and chewy sour gummy worms', 20, 1.7, 7, '2023-02-28'),
  ('Mixed Nuts', 'Assortment of mixed nuts', 15, 4.0, 7, '2023-03-10');
-- Additional Grains
INSERT INTO Products (Name, Description, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Brown Rice', 'Nutritious and hearty brown rice', 30, 2.0, 9, '2023-02-28'),
  ('Quinoa', 'Healthy and protein-rich quinoa', 25, 3.5, 9, '2023-03-05'),
  ('Whole Wheat Pasta', 'Whole grain and fiber-rich pasta', 20, 2.2, 9, '2023-02-22'),
  ('Barley', 'Nutty and versatile barley', 18, 1.8, 9, '2023-02-20'),
  ('Couscous', 'Fluffy and flavorful couscous', 22, 1.5, 9, '2023-03-01'),
  ('Oats', 'Hearty and nutritious oats', 28, 2.5, 9, '2023-03-08'),
  ('Bulgur', 'Nutritious and versatile bulgur', 24, 1.7, 9, '2023-02-25');
-- Additional Bakery Items

INSERT INTO Products (Name, Description, QuantityInStock, Price, CategoryID, ExpireDate)
VALUES
  ('Onion (1 kg)', 'Versatile and flavorful onion', 20, 1.5, 2, '2023-02-28'),
  ('Garlic (1 kg)', 'Aromatic and pungent garlic', 15, 2.0, 2, '2023-02-25'),
  ('Carrot (1 kg)', 'Fresh and nutritious carrot', 25, 1.0, 2, '2023-03-05'),
  ('Broccoli', 'Nutritious and versatile broccoli', 18, 1.2, 2, '2023-02-22'),
  ('Spinach (bunch)', 'Leafy and nutrient-packed spinach', 20, 1.8, 2, '2023-03-01');

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


psql -h <hostname> -p <port> -U <username> -d <database>
