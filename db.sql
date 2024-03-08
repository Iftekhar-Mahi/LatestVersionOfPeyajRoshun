--trigger 1
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





-- Alter the Cart table to include DiscountPercentage
ALTER TABLE Cart
ADD COLUMN DiscountPercentage DECIMAL(5, 2) DEFAULT 0;

--function 1

-- Update the placeorderforuser function to calculate price with discount
CREATE OR REPLACE FUNCTION placeorderforuser(
    uid bigint, 
    payment_method VARCHAR(50), 
    payment_status VARCHAR(50)
) 
RETURNS void AS $$
DECLARE
    id int;
BEGIN
    -- Set timezone to your desired timezone
    SET TIME ZONE 'Asia/Dhaka';

    -- Create a new order for the user
    INSERT INTO orders (userid, dateplaced, amount, paymentmethod, paymentstatus, deliverystatus)
    VALUES (uid, CURRENT_DATE, 0, payment_method, payment_status, 'Processing')
    RETURNING orderid INTO id;

    -- Move products from cart to order details
    -- Move unique products from cart to order details
    INSERT INTO orderdetails (orderid, productid, quantity, price)
    SELECT DISTINCT ON (c.productid) id, c.productid, c.quantity, 
           (p.price - (p.price * (c.discountpercentage / 100))) AS discounted_price
    FROM cart c
    INNER JOIN products p ON c.productid = p.productid
    WHERE c.userid = uid;

     UPDATE orders
    SET amount = (SELECT SUM(price * quantity) FROM orderdetails WHERE orderid = id)
    WHERE orderid = id;
    DELETE FROM cart WHERE userid = uid;
    
END;
$$ LANGUAGE plpgsql;


--trigger 2

CREATE OR REPLACE FUNCTION reduce_product_quantity()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Products
    SET QuantityInStock = QuantityInStock - NEW.quantity
    WHERE ProductID = NEW.productid;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER place_order_trigger
AFTER INSERT ON OrderDetails
FOR EACH ROW
EXECUTE FUNCTION reduce_product_quantity();


--function 2
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

--procedure 1

CREATE OR REPLACE FUNCTION update_user_profile(
    p_userId bigint,
    p_firstName varchar(255),
    p_lastName varchar(255),
    p_email varchar(255),
    p_city varchar(100),
    p_district varchar(100)
) RETURNS void AS $$
BEGIN
    UPDATE Users
    SET
        firstName = p_firstName,
        LastName = p_lastName,
        Email = p_email,
        City = p_city,
        District = p_district
    WHERE
        UserID = p_userId;
END;
$$ LANGUAGE plpgsql;

--procedure 2

CREATE OR REPLACE FUNCTION add_or_update_order_review(
    p_order_id bigint,
    p_user_id bigint,
    p_review_text text
) RETURNS void AS $$
BEGIN
    -- Check if a review exists for the given userid and orderid
    IF EXISTS (
        SELECT 1 FROM orderreview WHERE userid = p_user_id AND orderid = p_order_id
    ) THEN
        -- If a review exists, update it
        UPDATE orderreview 
        SET comment = p_review_text 
        WHERE userid = p_user_id AND orderid = p_order_id;
        RAISE NOTICE 'Review updated successfully';
    ELSE
        -- If no review exists, insert a new one
        INSERT INTO orderreview (userid, orderid, rating, comment) 
        VALUES (p_user_id, p_order_id, 4, p_review_text);
        RAISE NOTICE 'Review inserted successfully';
    END IF;
END;
$$ LANGUAGE plpgsql;



psql - h < hostname > - p < port > - U < username > - d < database >



