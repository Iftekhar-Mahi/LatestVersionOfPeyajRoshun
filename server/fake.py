from faker import Faker
import random

# Initialize Faker to generate fake data
fake = Faker()

# Function to generate fake data for Users table
def generate_users_data():
    with open("insert_data.sql", "a") as f:
        f.write("-- Inserting into Users\n")
        f.write("INSERT INTO Users (FirstName, LastName, Email, RoadNo, HouseNo, City, District, Password) VALUES\n")
        for _ in range(100):
            first_name = fake.first_name()
            last_name = fake.last_name()
            email = fake.email()
            road_no = fake.building_number()
            house_no = fake.building_number()
            city = fake.city()
            district = fake.state()
            password = fake.password()
            f.write(f"('{first_name}', '{last_name}', '{email}', '{road_no}', '{house_no}', '{city}', '{district}', '{password}'),\n")

# Function to generate fake data for Categories table
def generate_categories_data():
    categories = [
        "Cleaning Agent", "Fruit", "Vegetables", "Electronics", "Clothing",
        "Books", "Toys", "Furniture", "Cosmetics", "Stationery",
        "Kitchen Appliances", "Sports Equipment", "Pet Supplies", "Home Decor",
        "Tools", "Automotive", "Jewelry", "Baby Products", "Office Supplies",
        "Healthcare", "Music Instruments", "Outdoor Gear", "Craft Supplies",
        "Party Supplies", "Fitness Gear", "Gardening Tools", "Art Supplies",
        "Camping Gear", "Travel Accessories", "Bathroom Essentials",
        "Snacks", "Beverages", "Dairy Products", "Frozen Foods", "Bakery",
        "Canned Goods", "Condiments", "Meat", "Seafood", "Grains",
        "Sweets", "Pasta", "Soups", "Salad Dressings", "Sauces",
        "Nuts", "Dried Fruits", "Spices", "Tea", "Coffee",
        "Juices", "Water", "Sodas", "Energy Drinks", "Wine",
        "Beer", "Spirits", "Liquors", "Cocktail Mixers", "Mixers",
        "Chips", "Cookies", "Chocolate", "Candy", "Gum",
        "Granola Bars", "Crackers", "Popcorn", "Pretzels", "Jerky",
        "Trail Mix", "Nut Butters", "Jam", "Honey", "Syrups",
        "Pancake Mix", "Cake Mix", "Brownie Mix", "Frosting", "Pie Fillings",
        "Dessert Mix", "Ice Cream Toppings", "Cereal", "Oatmeal", "Pancake Syrup",
        "Bread", "Bagels", "English Muffins", "Tortillas", "Pitas",
        "Rolls", "Croissants", "Donuts", "Muffins", "Cupcakes"
    ]
    
    with open("insert_data.sql", "a") as f:
        f.write("\n-- Inserting into Categories\n")
        f.write("INSERT INTO Categories (CategoryName, Description) VALUES\n")
        for category_name in categories:
            description = fake.text()
            f.write(f"('{category_name}', '{description}'),\n")


# Function to generate fake data for Products table
# Function to generate fake data for Products table
def generate_products_data():
    categories = {
        "Cleaning Agent": ["Soap", "Detergent", "Bleach", "Scourer", "Disinfectant"],
        "Fruit": ["Apples", "Oranges", "Bananas", "Grapes", "Strawberries"],
        "Vegetables": ["Carrots", "Broccoli", "Tomatoes", "Cucumbers", "Spinach"],
        "Electronics": ["Laptop", "Smartphone", "Headphones", "Smartwatch", "Tablet"],
        "Clothing": ["T-shirt", "Jeans", "Dress", "Jacket", "Sweater"],
        # Add more categories and subnames as needed
    }
    
    with open("insert_data.sql", "a") as f:
        f.write("\n-- Inserting into Products\n")
        f.write("INSERT INTO Products (Name, Description, QuantityInStock, Price, Rating, CategoryID, ExpireDate) VALUES\n")
        for category, subnames in categories.items():
            category_id = fake.random_int(1, 100)  # Assuming there are 100 categories
            for subname in subnames:
                name = subname
                description = fake.sentence()
                quantity_in_stock = fake.random_int(1, 100)
                price = fake.random_int(10, 1000)
                rating = random.randint(1, 5)
                expire_date = fake.date_between(start_date='-1y', end_date='+1y')
                f.write(f"('{name}', '{description}', {quantity_in_stock}, {price}, {rating}, {category_id}, '{expire_date}'),\n")


# Function to generate fake data for Orders table
def generate_orders_data():
    with open("insert_data.sql", "a") as f:
        f.write("\n-- Inserting into Orders\n")
        f.write("INSERT INTO Orders (UserID, DatePlaced, Amount, PaymentMethod, PaymentStatus, DeliveryStatus) VALUES\n")
        for _ in range(100):
            user_id = fake.random_int(1, 100)  # Assuming there are 100 users
            date_placed = fake.date_time_this_year()
            amount = fake.random_int(10, 1000)
            payment_method = random.choice(["Credit Card", "Debit Card", "PayPal"])
            payment_status = random.choice(["Paid", "Pending", "Failed"])
            delivery_status = random.choice(["Delivered", "Shipped", "Pending"])
            f.write(f"({user_id}, '{date_placed}', {amount}, '{payment_method}', '{payment_status}', '{delivery_status}'),\n")

# Function to generate fake data for OrderDetails table
def generate_order_details_data():
    with open("insert_data.sql", "a") as f:
        f.write("\n-- Inserting into OrderDetails\n")
        f.write("INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price) VALUES\n")
        for _ in range(100):
            order_id = fake.random_int(1, 100)  # Assuming there are 100 orders
            product_id = fake.random_int(1, 100)  # Assuming there are 100 products
            quantity = fake.random_int(1, 10)
            price = fake.random_int(10, 1000)
            f.write(f"({order_id}, {product_id}, {quantity}, {price}),\n")

# Function to generate fake data for ProductReview table
# Function to generate fake data for ProductReview table
def generate_product_review_data():
    with open("insert_data.sql", "a") as f:
        f.write("\n-- Inserting into ProductReview\n")
        f.write("INSERT INTO ProductReview (UserID, ProductID, Rating, Comment) VALUES\n")
        comments = [
            "Great product, highly recommended!",
            "Not bad, but could be better.",
            "Average product, does the job.",
            "Excellent quality, exceeded expectations.",
            "Terrible product, very disappointing.",
            "Good value for money.",
            "Decent product, nothing special.",
            "Could use some improvements.",
            "Absolutely love it!",
            "Would not buy again."
        ]
        for _ in range(100):
            user_id = fake.random_int(1, 100)  # Assuming there are 100 users
            product_id = fake.random_int(1, 100)  # Assuming there are 100 products
            rating = random.randint(1, 5)
            comment = random.choice(comments)
            f.write(f"({user_id}, {product_id}, {rating}, '{comment}'),\n")

# Function to generate fake data for OrderReview table
def generate_order_review_data():
    with open("insert_data.sql", "a") as f:
        f.write("\n-- Inserting into OrderReview\n")
        f.write("INSERT INTO OrderReview (UserID, OrderID, Rating, Comment) VALUES\n")
        comments = [
            "Great service, arrived on time!",
            "Delivery was slow, but overall satisfied.",
            "Received wrong items, had to return.",
            "Packaging was damaged, items were fine.",
            "Customer service was helpful.",
            "Order was missing items, had to follow up.",
            "Items were as described, no complaints.",
            "Delivery person was rude and unprofessional.",
            "Had issues with payment processing.",
            "Will definitely order again!"
        ]
        for _ in range(100):
            user_id = fake.random_int(1, 100)  # Assuming there are 100 users
            order_id = fake.random_int(1, 100)  # Assuming there are 100 orders
            rating = random.randint(1, 5)
            comment = random.choice(comments)
            f.write(f"({user_id}, {order_id}, {rating}, '{comment}'),\n")

from datetime import timedelta

# Function to generate fake data for Promotions table
def generate_promotions_data():
    promotions = {
        "Year End Sale": "Celebrate the end of the year with amazing discounts on a wide range of products!",
        "Black Friday": "Don't miss out on the biggest sale of the year! Get huge discounts on all your favorite items.",
        "Eid Sale": "Celebrate Eid with special discounts and offers on a variety of products.",
        "Puja Sale": "Make your festive season even more special with exclusive discounts and deals!",
        "Back to School": "Get ready for the new school year with fantastic deals on school supplies and more.",
        "Spring Clearance": "Spring into savings with our clearance sale! Limited time only.",
        "Summer Sale": "Beat the heat with hot deals and cool savings in our summer sale event.",
        "Winter Wonderland": "Embrace the winter season with cozy discounts on winter essentials and more.",
        "Valentine's Day": "Spread the love with sweet deals and romantic discounts for Valentine's Day.",
        "Mother's Day": "Show Mom some love with special discounts and heartfelt deals.",
        "Father's Day": "Celebrate Dad with great savings on gifts he'll love.",
        "Halloween Spooktacular": "Get ready for a spooktacular Halloween with frightfully good deals.",
        "Cyber Monday": "Shop 'til you drop with unbeatable online deals on Cyber Monday!",
        "Christmas Spectacular": "Make your holiday season merry and bright with festive discounts and offers.",
        "New Year's Bash": "Ring in the New Year with fantastic deals and savings!",
        "Independence Day Celebration": "Celebrate Independence Day with patriotic savings and special offers."
    }
    
    with open("insert_data.sql", "a") as f:
        f.write("\n-- Inserting into Promotions\n")
        f.write("INSERT INTO Promotions (Name, Description, CouponCode, DiscountPercentage, StartDate, EndDate) VALUES\n")
        for promotion_name, description in promotions.items():
            coupon_code = ''.join([fake.random_uppercase_letter() for _ in range(2)]) + str(fake.random_digit())  # Generating a random coupon code
            discount_percentage = fake.random_int(5, 50)  # Generating a random discount percentage
            start_date = fake.date_time_this_year()  # Generating a random start date within the current year
            end_date = start_date + timedelta(days=fake.random_int(1, 365))  # Generating an end date after the start date
            f.write(f"('{promotion_name}', '{description}', '{coupon_code}', {discount_percentage}, '{start_date}', '{end_date}'),\n")

# Function to generate fake data for PromotionProduct table
def generate_promotion_product_data():
    with open("insert_data.sql", "a") as f:
        f.write("\n-- Inserting into PromotionProduct\n")
        f.write("INSERT INTO PromotionProduct (PromotionID, ProductID, DiscountPercentage) VALUES\n")
        for _ in range(100):
            promotion_id = fake.random_int(1, 100)  # Assuming there are 100 promotions
            product_id = fake.random_int(1, 100)  # Assuming there are 100 products
            discount_percentage = fake.random_int(1, 100)
            f.write(f"({promotion_id}, {product_id}, {discount_percentage}),\n")

# Function to generate fake data for Cart table
def generate_cart_data():
    with open("insert_data.sql", "a") as f:
        f.write("\n-- Inserting into Cart\n")
        f.write("INSERT INTO Cart (UserID, ProductID, Quantity) VALUES\n")
        for _ in range(100):
            user_id = fake.random_int(1, 100)  # Assuming there are 100 users
            product_id = fake.random_int(1, 100)  # Assuming there are 100 products
            quantity = fake.random_int(1, 10)
            f.write(f"({user_id}, {product_id}, {quantity}),\n")

# Call functions to generate fake data for each table
generate_users_data()
generate_categories_data()
generate_products_data()
generate_orders_data()
generate_order_details_data()
generate_product_review_data()
generate_order_review_data()
generate_promotions_data()
generate_promotion_product_data()
generate_cart_data()
