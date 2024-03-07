INSERT INTO
  CART (UserID, ProductID, Quantity)
VALUES
  (1, 1, 2),
  (1, 4, 2),
  (1, 5, 6);


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
