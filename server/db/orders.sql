INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (1, '2023-01-15', 20, 'Credit Card', 'Paid', 'Delivered');

INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (2, '2023-01-16', 15, 'PayPal', 'Paid', 'Processing');

INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (3, '2023-01-20', 30, 'Cash On Delivery', 'Pending', 'Shipped');

INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (4, '2023-01-25', 25, 'Credit Card', 'Paid', 'Delivered');

INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (5, '2023-02-01', 40, 'PayPal', 'Paid', 'Processing');

INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (6, '2023-02-05', 15, 'Credit Card', 'Paid', 'Delivered');

INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (7, '2023-02-10', 18, 'PayPal', 'Paid', 'Processing');

INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (8, '2023-02-15', 22, 'Credit Card', 'Paid', 'Delivered');

INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (9, '2023-02-20', 16, 'PayPal', 'Paid', 'Processing');

INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus)
VALUES (10, '2023-02-25', 28, 'Credit Card', 'Paid', 'Delivered');


INSERT INTO
  OrderDetails (OrderID, ProductID, Quantity, Price)
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
