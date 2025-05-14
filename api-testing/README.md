# Fake Store API Testing Suite

This project contains automated tests for validating the Fake Store API (https://fakestoreapi.com/products).

## Test Objectives

The test suite validates:
- Server response code (expected 200)
- Product attributes validation:
  - Title (must not be empty)
  - Price (must not be negative)
  - Rating (must not exceed 5)
- Data structure validation
- Generates a report of products containing defects

## Setup

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

## Running Tests

To run the tests:
```bash
pytest test_fakestore_api.py -v
```

To generate an HTML report:
```bash
pytest test_fakestore_api.py --html=report.html
```

## Test Cases

1. `test_server_response`: Verifies that the API endpoint returns a 200 status code
2. `test_product_attributes`: Validates product attributes and generates a defect report
3. `test_response_structure`: Ensures the API response has the correct data structure

If any defective products are found, they will be displayed in the console output with detailed information about the defects. 