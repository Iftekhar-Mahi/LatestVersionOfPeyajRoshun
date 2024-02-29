-- -- list of all tables \d
-- User Table
drop database peyajroshun;

Create database peyajroshun;

--popular query for testing
SELECT * from orders;
SELECT * from orderdetails where orderid=
SELECT * from cart;

CREATE TABLE Users (
UserID BIGSERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  Email VARCHAR(255) UNIQUE NOT NULL,
  RoadNo VARCHAR(50),
  HouseNo VARCHAR(50),
  City VARCHAR(100),
  District VARCHAR(100),
  Password VARCHAR(255) NOT NULL
);

-- Category Table
CREATE TABLE
  Categories (
    CategoryID SERIAL PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL,
    Description TEXT
  );

-- Product Table
CREATE TABLE
  Products (
    ProductID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    QuantityInStock INT NOT NULL,
    Price INT NOT NULL,
    CategoryID INT REFERENCES Categories (CategoryID),
    ExpireDate DATE
  );

-- Orders Table
CREATE TABLE
  Orders (
    OrderID SERIAL PRIMARY KEY,
    UserID BIGINT REFERENCES Users (UserID),
    DatePlaced DATE,
    Amount INT NOT NULL,
    PaymentMethod VARCHAR(50),
    PaymentStatus VARCHAR(50),
    DeliveryStatus VARCHAR(50)
  );

-- Order Details Table
CREATE TABLE
  OrderDetails (
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Price INT NOT NULL,
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
  );

-- ProductReview Table
CREATE TABLE
  ProductReview (
    UserID BIGINT,
    ProductID INT,
    Rating INT NOT NULL,
    Comment TEXT,
    PRIMARY KEY (UserID, ProductID),
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
  );

-- OrderReview Table
CREATE TABLE
  OrderReview (
    UserID BIGINT,
    OrderID INT,
    Rating INT NOT NULL,
    Comment TEXT,
    PRIMARY KEY (UserID, OrderID),
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID)
  );

-- Promotions Table
CREATE TABLE
  Promotions (
    PromotionID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    CouponCode VARCHAR(50) UNIQUE,
    DiscountPercentage DECIMAL(5, 2) NOT NULL,
    StartDate DATE,
    EndDate DATE
  );

-- PromotionProduct Table
CREATE TABLE
  PromotionProduct (
    PromotionID INT,
    ProductID INT,
    DiscountPercentage DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY (PromotionID, ProductID),
    FOREIGN KEY (PromotionID) REFERENCES Promotions (PromotionID),
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
  );

--Create table for Cart
CREATE TABLE Cart (
    UserID BIGSERIAL,
    CartID SERIAL,
    ProductID INT,
    Quantity INT NOT NULL,
    PRIMARY KEY (UserID, CartID, ProductID),
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID)
);


CREATE OR REPLACE FUNCTION placeorderforuser(
    uid bigint, 
    payment_method VARCHAR(50), 
    payment_status VARCHAR(50)
) 
RETURNS void AS $$
DECLARE
    id int;
BEGIN
    -- Create a new order for the user
    INSERT INTO orders (userid, dateplaced, amount, paymentmethod, paymentstatus, deliverystatus)
    VALUES (uid, CURRENT_DATE, 0, payment_method, payment_status, 'Processing')
    RETURNING orderid INTO id;

    -- Move products from cart to order details
    -- Move unique products from cart to order details
    INSERT INTO orderdetails (orderid, productid, quantity, price)
    SELECT DISTINCT ON (c.productid) id, c.productid, c.quantity, p.price*c.quantity
    FROM cart c
    INNER JOIN products p ON c.productid = p.productid
    WHERE c.userid = uid;

    -- Update the order amount based on the sum of product prices
    UPDATE orders
    SET amount = (SELECT SUM(price) FROM orderdetails WHERE orderid = id)
    WHERE orderid = id;

    -- Delete products from cart for the user
    DELETE FROM cart WHERE userid = uid;
    
    -- Optional: If you want to return the OrderId
    -- RETURN orderid;
END;
$$ LANGUAGE plpgsql;
