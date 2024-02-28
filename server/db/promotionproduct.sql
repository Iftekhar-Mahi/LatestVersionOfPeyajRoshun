-- Insert data into PromotionProduct table
INSERT INTO PromotionProduct (PromotionID, ProductID, DiscountPercentage)
VALUES
  -- Promotion 1 products with discount
  (1, 11, 0.10),  -- Apple
  (1, 33, 0.15),  -- Orange
  (1, 53, 0.20),  -- Pineapple

  -- Promotion 2 products with discount
  (2, 12, 0.10),  -- Banana
  (2, 34, 0.15),  -- Carrot
  (2, 54, 0.20),  -- Spinach

  -- Promotion 3 products with discount
  (3, 13, 0.15),  -- Milk
  (3, 35, 0.10),  -- Cheese
  (3, 55, 0.20),  -- Butter

  -- Promotion 4 products with discount
  (4, 14, 0.10),  -- Bread
  (4, 36, 0.15),  -- Baguette
  (4, 56, 0.20),  -- Bagel

  -- Promotion 5 products with discount
  (5, 15, 0.20),  -- Chicken Breast
  (5, 37, 0.10),  -- Salmon Fillet
  (5, 57, 0.15);  -- Ground Beef
