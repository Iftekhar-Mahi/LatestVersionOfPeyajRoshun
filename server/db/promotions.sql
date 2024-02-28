-- Inserting dummy data into Promotions table
INSERT INTO Promotions (Name, Description, CouponCode, DiscountPercentage, StartDate, EndDate)
VALUES
  ('Spring Sale', 'Get 20% off on selected items', 'SPRING20', 20.00, '2024-03-01', '2024-03-15'),
  ('Summer Clearance', 'Clearance sale with up to 30% off', 'SUMMER30', 30.00, '2024-06-01', '2024-06-30'),
  ('Holiday Special', 'Exclusive holiday discounts', 'HOLIDAY15', 15.00, '2024-12-01', '2024-12-25');

-- Inserting additional dummy data into Promotions table
INSERT INTO Promotions (Name, Description, CouponCode, DiscountPercentage, StartDate, EndDate)
VALUES
  ('Flash Sale', 'Limited-time offers on various products', 'FLASH25', 25.00, '2024-02-15', '2024-02-20'),
  ('Back-to-School', 'Special discounts for the new school year', 'SCHOOL10', 10.00, '2024-08-01', '2024-08-15'),
  ('Tech Deals', 'Save big on electronics and gadgets', 'TECHSALE', 18.50, '2024-04-10', '2024-04-30'),
  ('Winter Warm-Up', 'Cozy deals for the cold season', 'WINTER20', 20.00, '2024-01-10', '2024-01-31'),
  ('Fitness Frenzy', 'Discounts on fitness equipment and gear', 'FITNESS15', 15.00, '2024-05-01', '2024-05-15'),
  ('Home Makeover', 'Renovate with special offers on home items', 'HOME10', 10.00, '2024-07-01', '2024-07-31'),
  ('Gaming Extravaganza', 'Score gaming deals with exclusive discounts', 'GAMER20', 20.00, '2024-09-15', '2024-09-30'),
  ('Spring Cleaning', 'Clean up with savings on cleaning products', 'CLEAN25', 25.00, '2024-03-20', '2024-04-05'),
  ('Fashion Fiesta', 'Stylish discounts on clothing and accessories', 'FASHION30', 30.00, '2024-06-15', '2024-06-30'),
  ('Pet Palooza', 'Spoil your pets with special discounts', 'PETLOVE', 12.00, '2024-11-01', '2024-11-15');
