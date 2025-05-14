import requests
import pytest

API_URL = "https://fakestoreapi.com/products"

def get_products():
    """Fetch products from the Fake Store API."""
    response = requests.get(API_URL)
    return response

def test_server_response():
    """Test if the server responds with status code 200."""
    response = get_products()
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"

def test_product_attributes():
    """Test if all products have required attributes with valid values."""
    response = get_products()
    assert response.status_code == 200
    
    products = response.json()
    defective_products = []
    
    for product in products:
        defects = []
        
        # Check title
        if not product.get('title') or len(product['title'].strip()) == 0:
            defects.append("Empty or missing title")
            
        # Check price
        price = product.get('price')
        if price is None or price < 0:
            defects.append(f"Invalid price: {price}")
            
        # Check rating
        rating = product.get('rating', {}).get('rate')
        if rating is None or rating > 5:
            defects.append(f"Invalid rating: {rating}")
            
        if defects:
            defective_products.append({
                'id': product.get('id'),
                'defects': defects,
                'product_data': product
            })
    
    # Print defective products report
    if defective_products:
        print("\nDefective Products Report:")
        print("=" * 50)
        for product in defective_products:
            print(f"\nProduct ID: {product['id']}")
            print("Defects found:")
            for defect in product['defects']:
                print(f"- {defect}")
            print("-" * 30)
    
    # Assert no defective products were found
    assert len(defective_products) == 0, f"Found {len(defective_products)} products with defects"

def test_response_structure():
    """Test if the response is a non-empty list of products."""
    response = get_products()
    products = response.json()
    
    assert isinstance(products, list), "Response should be a list"
    assert len(products) > 0, "Response should not be empty"
    
    # Check if each product has the required structure
    for product in products:
        assert isinstance(product, dict), "Each product should be a dictionary"
        assert 'id' in product, "Product should have an ID"
        assert 'title' in product, "Product should have a title"
        assert 'price' in product, "Product should have a price"
        assert 'rating' in product, "Product should have a rating"
        assert isinstance(product['rating'], dict), "Rating should be a dictionary"
        assert 'rate' in product['rating'], "Rating should have a rate value" 