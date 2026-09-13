#!/usr/bin/env python3
"""
Backend API Testing Script for Frontend-Only Restaurant Platform
Tests health endpoints and verifies no backend operations are enabled
"""

import requests
import sys
import os
from typing import Dict, Any

# Get base URL from environment
BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'https://bawarchi-platform.preview.emergentagent.com')
API_BASE = f"{BASE_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_test(name: str, passed: bool, details: str = ""):
    status = f"{Colors.GREEN}✅ PASS{Colors.END}" if passed else f"{Colors.RED}❌ FAIL{Colors.END}"
    print(f"{status} - {name}")
    if details:
        print(f"    {details}")
    return passed

def test_health_endpoint():
    """Test GET /api returns health status"""
    print(f"\n{Colors.BLUE}Testing Health Endpoint (GET /api){Colors.END}")
    try:
        response = requests.get(f"{API_BASE}", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            data.get('status') == 'ok' and
            data.get('mode') == 'frontend-demo' and
            data.get('ordering') == 'local-preview' and
            data.get('database') == 'not-connected'
        )
        
        details = f"Status: {response.status_code}, Response: {data}"
        return print_test("GET /api health check", passed, details)
    except Exception as e:
        return print_test("GET /api health check", False, f"Error: {str(e)}")

def test_health_explicit():
    """Test GET /api/health returns health status"""
    print(f"\n{Colors.BLUE}Testing Explicit Health Endpoint (GET /api/health){Colors.END}")
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            data.get('status') == 'ok' and
            data.get('mode') == 'frontend-demo' and
            data.get('ordering') == 'local-preview' and
            data.get('database') == 'not-connected'
        )
        
        details = f"Status: {response.status_code}, Response: {data}"
        return print_test("GET /api/health explicit", passed, details)
    except Exception as e:
        return print_test("GET /api/health explicit", False, f"Error: {str(e)}")

def test_unknown_get_404():
    """Test GET /api/orders returns 404"""
    print(f"\n{Colors.BLUE}Testing Unknown GET Endpoint (GET /api/orders){Colors.END}")
    try:
        response = requests.get(f"{API_BASE}/orders", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 404 and
            'error' in data
        )
        
        details = f"Status: {response.status_code}, Response: {data}"
        return print_test("GET /api/orders returns 404", passed, details)
    except Exception as e:
        return print_test("GET /api/orders returns 404", False, f"Error: {str(e)}")

def test_post_405():
    """Test POST /api/orders returns 405 (Method Not Allowed)"""
    print(f"\n{Colors.BLUE}Testing POST to Unknown Endpoint (POST /api/orders){Colors.END}")
    try:
        response = requests.post(f"{API_BASE}/orders", json={"test": "data"}, timeout=10)
        
        # Next.js automatically returns 405 for unsupported methods
        passed = response.status_code == 405
        
        details = f"Status: {response.status_code}"
        return print_test("POST /api/orders returns 405", passed, details)
    except Exception as e:
        return print_test("POST /api/orders returns 405", False, f"Error: {str(e)}")

def test_other_unknown_paths():
    """Test other unknown API paths return 404"""
    print(f"\n{Colors.BLUE}Testing Other Unknown Paths{Colors.END}")
    paths = ['/api/menu', '/api/restaurants', '/api/customers']
    all_passed = True
    
    for path in paths:
        try:
            response = requests.get(f"{BASE_URL}{path}", timeout=10)
            data = response.json()
            passed = response.status_code == 404 and 'error' in data
            all_passed = all_passed and passed
            print_test(f"GET {path} returns 404", passed, f"Status: {response.status_code}")
        except Exception as e:
            all_passed = False
            print_test(f"GET {path} returns 404", False, f"Error: {str(e)}")
    
    return all_passed

def main():
    print(f"\n{Colors.YELLOW}{'='*70}{Colors.END}")
    print(f"{Colors.YELLOW}Backend API Test Suite - Frontend-Only Restaurant Platform{Colors.END}")
    print(f"{Colors.YELLOW}Base URL: {BASE_URL}{Colors.END}")
    print(f"{Colors.YELLOW}{'='*70}{Colors.END}")
    
    results = []
    
    # Run all tests
    results.append(test_health_endpoint())
    results.append(test_health_explicit())
    results.append(test_unknown_get_404())
    results.append(test_post_405())
    results.append(test_other_unknown_paths())
    
    # Summary
    passed = sum(results)
    total = len(results)
    
    print(f"\n{Colors.YELLOW}{'='*70}{Colors.END}")
    print(f"{Colors.YELLOW}Test Summary{Colors.END}")
    print(f"{Colors.YELLOW}{'='*70}{Colors.END}")
    print(f"Total Tests: {total}")
    print(f"Passed: {Colors.GREEN}{passed}{Colors.END}")
    print(f"Failed: {Colors.RED}{total - passed}{Colors.END}")
    
    if passed == total:
        print(f"\n{Colors.GREEN}✅ All backend API tests passed!{Colors.END}\n")
        return 0
    else:
        print(f"\n{Colors.RED}❌ Some tests failed. Please review the output above.{Colors.END}\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
