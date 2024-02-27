CREATE OR REPLACE FUNCTION validate_email_format()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the new email is in a valid format
    IF NEW.email IS NOT NULL AND NOT NEW.email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' THEN
        RAISE EXCEPTION 'Invalid email format';
    END IF;

    -- If the email is valid, allow the update to proceed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_email_format
BEFORE UPDATE OF email ON users
FOR EACH ROW
EXECUTE FUNCTION validate_email_format();





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
    SELECT DISTINCT ON (c.productid) id, c.productid, c.quantity, p.price
    FROM cart c
    INNER JOIN products p ON c.productid = p.productid
    WHERE c.userid = uid;

    -- Update the order amount based on the sum of product prices
    UPDATE orders
    SET amount = (SELECT SUM(price * quantity) FROM orderdetails WHERE orderid = id)
    WHERE orderid = id;

    -- Delete products from cart for the user
    DELETE FROM cart WHERE userid = uid;
    
    -- Optional: If you want to return the OrderI
    -- RETURN orderid;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION getavgrating(id INT)
RETURNS DECIMAL AS $$
DECLARE
    avg_rating DECIMAL;
BEGIN
    SELECT AVG(rating) INTO avg_rating
    FROM ProductReview
    WHERE productid = id;
    
    RETURN avg_rating;
END;
$$ LANGUAGE plpgsql;


INSERT INTO
  CART (UserID, ProductID, Quantity)
VALUES
  (1, 1, 2),
  (1, 4, 2),
  (1, 5, 6);

-- Users Table
INSERT INTO
  Users (
    FirstName,
    LastName,
    Email,
    RoadNo,
    HouseNo,
    City,
    District,
    Password
  )
VALUES
  (
    'John',
    'Doe',
    'john.doe@email.com',
    '123',
    '456',
    'CityA',
    'DistrictX',
    'password123'
  ),
  (
    'Alice',
    'Smith',
    'alice.smith@email.com',
    '789',
    '101',
    'CityB',
    'DistrictY',
    'password456'
  ),
  (
    'Bob',
    'Johnson',
    'bob.johnson@email.com',
    '456',
    '789',
    'CityC',
    'DistrictZ',
    'password789'
  ),
  (
    'Eva',
    'Williams',
    'eva.williams@email.com',
    '101',
    '202',
    'CityD',
    'DistrictW',
    'passwordABC'
  ),
  (
    'David',
    'Brown',
    'david.brown@email.com',
    '303',
    '505',
    'CityE',
    'DistrictV',
    'passwordDEF'
  ),
  (
    'Sophia',
    'Miller',
    'sophia.miller@email.com',
    '606',
    '707',
    'CityF',
    'DistrictU',
    'passwordGHI'
  ),
  (
    'James',
    'Davis',
    'james.davis@email.com',
    '909',
    '808',
    'CityG',
    'DistrictT',
    'passwordJKL'
  ),
  (
    'Emma',
    'Taylor',
    'emma.taylor@email.com',
    '404',
    '606',
    'CityH',
    'DistrictS',
    'passwordMNO'
  ),
  (
    'Michael',
    'Clark',
    'michael.clark@email.com',
    '707',
    '404',
    'CityI',
    'DistrictR',
    'passwordPQR'
  );

-- Categories Table

-- Products Table

   
-- Orders Table


-- OrderDetails Table

-- ProductReview Table
INSERT INTO
  ProductReview (UserID, ProductID, Rating, Comment)
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
INSERT INTO
  OrderReview (UserID, OrderID, Rating, Comment)
VALUES
  (1, 1, 4, 'Fast delivery, good service'),
  (2, 2, 3, 'Some items were missing'),
  (3, 3, 5, 'Perfect order, everything included'),
  (4, 4, 4, 'Timely delivery and well-packaged'),
  (
    5,
    5,
    3,
    'Slight delay in delivery, but good overall'
  ),
  (6, 6, 5, 'Excellent service and communication'),
  (7, 7, 2, 'Late delivery and missing snacks'),
  (8, 8, 4, 'Quick delivery, no issues'),
  (9, 9, 5, 'Very satisfied with the order'),
  (10, 10, 3, 'Some products were close to expiry');

-- Promotions Table
INSERT INTO
  Promotions (
    Name,
    Description,
    CouponCode,
    DiscountPercentage,
    StartDate,
    EndDate
  )
VALUES
  (
    'SpringSale',
    'Special discounts for spring',
    'SPRING2023',
    15.0,
    '2023-03-01',
    '2023-03-15'
  ),
  (
    'WeekendDeal',
    'Exclusive deals for the weekend',
    'WEEKEND',
    10.0,
    '2023-02-24',
    '2023-02-26'
  ),
  (
    'HolidaySpecial',
    'Holiday season discounts',
    'HOLIDAY2023',
    20.0,
    '2023-12-01',
    '2023-12-31'
  ),
  (
    'BackToSchool',
    'Deals for back-to-school season',
    'SCHOOL2023',
    12.0,
    '2023-08-15',
    '2023-09-15'
  ),
  (
    'SummerClearance',
    'Clearance sale for summer',
    'SUMMERCLEAR',
    25.0,
    '2023-06-01',
    '2023-06-15'
  ),
  (
    'BlackFriday',
    'Black Friday discounts',
    'BLACKFRI2023',
    30.0,
    '2023-11-24',
    '2023-11-27'
  ),
  (
    'CyberMonday',
    'Cyber Monday online deals',
    'CYBERMON2023',
    18.0,
    '2023-11-27',
    '2023-11-30'
  ),
  (
    'AnniversarySale',
    'Celebrating our anniversary',
    'ANNIV2023',
    15.0,
    '2023-04-10',
    '2023-04-20'
  ),
  (
    'WinterWarmth',
    'Winter essentials at discounted prices',
    'WINTER2023',
    12.0,
    '2023-12-15',
    '2023-12-31'
  ),
  (
    'NewProductLaunch',
    'Special promotion for new products',
    'NEWLAUNCH',
    10.0,
    '2023-02-15',
    '2023-02-28'
  );

-- PromotionProduct Table
INSERT INTO
  PromotionProduct (PromotionID, ProductID, DiscountPercentage)
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
SELECT
  *
FROM
  Users;

-- Categories Table
SELECT
  *
FROM
  Categories;

-- Products Table
SELECT
  *
FROM
  Products;

-- Orders Table
SELECT
  *
FROM
  Orders;

-- OrderDetails Table
SELECT
  *
FROM
  OrderDetails;

-- ProductReview Table
SELECT
  *
FROM
  ProductReview;

-- OrderReview Table
SELECT
  *
FROM
  OrderReview;

-- Promotions Table
SELECT
  *
FROM
  Promotions;

-- PromotionProduct Table
SELECT
  *
FROM
  PromotionProduct;

psql - h < hostname > - p < port > - U < username > - d < database >



