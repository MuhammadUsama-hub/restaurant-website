#!/usr/bin/env python3
"""
Route and Static File Testing Script
Tests all routes, metadata, SEO, and static files
"""

import requests
import sys
import os
from typing import Dict, Any
from urllib.parse import urljoin

# Get base URL from environment
BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'https://bawarchi-platform.preview.emergentagent.com')

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

def test_route(path: str, expected_status: int = 200, check_content: list = None):
    """Test a route and optionally check for content"""
    try:
        url = urljoin(BASE_URL, path)
        response = requests.get(url, timeout=15)
        
        passed = response.status_code == expected_status
        
        if passed and check_content:
            for content in check_content:
                if content not in response.text:
                    passed = False
                    return print_test(f"Route {path}", False, f"Missing content: {content}")
        
        details = f"Status: {response.status_code}"
        if expected_status != 200:
            details += f" (expected {expected_status})"
        
        return print_test(f"Route {path}", passed, details)
    except Exception as e:
        return print_test(f"Route {path}", False, f"Error: {str(e)}")

def test_metadata_tags(path: str, checks: Dict[str, Any]):
    """Test metadata tags in HTML"""
    try:
        url = urljoin(BASE_URL, path)
        response = requests.get(url, timeout=15)
        html = response.text.lower()
        
        all_passed = True
        missing = []
        
        for tag, value in checks.items():
            if value.lower() not in html:
                all_passed = False
                missing.append(f"{tag}={value}")
        
        if all_passed:
            return print_test(f"Metadata for {path}", True, "All required tags found")
        else:
            return print_test(f"Metadata for {path}", False, f"Missing: {', '.join(missing[:3])}")
    except Exception as e:
        return print_test(f"Metadata for {path}", False, f"Error: {str(e)}")

def test_structured_data(path: str):
    """Test JSON-LD structured data"""
    try:
        url = urljoin(BASE_URL, path)
        response = requests.get(url, timeout=15)
        html = response.text
        
        # Check for JSON-LD script tag
        has_jsonld = 'application/ld+json' in html
        has_restaurant = '"@type"' in html and ('Restaurant' in html or 'LocalBusiness' in html)
        
        passed = has_jsonld and has_restaurant
        
        details = "JSON-LD structured data found" if passed else "Missing or incomplete structured data"
        return print_test(f"Structured data for {path}", passed, details)
    except Exception as e:
        return print_test(f"Structured data for {path}", False, f"Error: {str(e)}")

def test_robots_txt():
    """Test robots.txt configuration"""
    print(f"\n{Colors.BLUE}Testing robots.txt{Colors.END}")
    try:
        url = urljoin(BASE_URL, '/robots.txt')
        response = requests.get(url, timeout=10)
        content = response.text.lower()
        
        # Should have disallow for demo mode
        has_disallow = 'disallow: /' in content
        has_sitemap = 'sitemap:' in content
        
        passed = response.status_code == 200 and has_disallow and has_sitemap
        
        details = f"Status: {response.status_code}, Demo noindex: {has_disallow}, Sitemap: {has_sitemap}"
        return print_test("robots.txt configuration", passed, details)
    except Exception as e:
        return print_test("robots.txt configuration", False, f"Error: {str(e)}")

def test_sitemap_xml():
    """Test sitemap.xml"""
    print(f"\n{Colors.BLUE}Testing sitemap.xml{Colors.END}")
    try:
        url = urljoin(BASE_URL, '/sitemap.xml')
        response = requests.get(url, timeout=10)
        content = response.text
        
        # Check for required routes
        required_routes = ['/', '/menu', '/about', '/contact', '/locations']
        all_present = all(route in content for route in required_routes)
        
        passed = response.status_code == 200 and all_present and '<?xml' in content
        
        details = f"Status: {response.status_code}, All routes present: {all_present}"
        return print_test("sitemap.xml content", passed, details)
    except Exception as e:
        return print_test("sitemap.xml content", False, f"Error: {str(e)}")

def test_favicon():
    """Test favicon/icon"""
    print(f"\n{Colors.BLUE}Testing favicon{Colors.END}")
    try:
        # Next.js 15 uses /icon route
        url = urljoin(BASE_URL, '/icon')
        response = requests.get(url, timeout=10, allow_redirects=True)
        
        # Should return an image
        is_image = 'image' in response.headers.get('content-type', '').lower()
        
        passed = response.status_code == 200 and is_image
        
        details = f"Status: {response.status_code}, Content-Type: {response.headers.get('content-type', 'unknown')}"
        return print_test("Favicon/icon endpoint", passed, details)
    except Exception as e:
        return print_test("Favicon/icon endpoint", False, f"Error: {str(e)}")

def test_image_optimization():
    """Test Next.js image optimization"""
    print(f"\n{Colors.BLUE}Testing Image Optimization{Colors.END}")
    try:
        # Test if Next.js image endpoint works (it should serve optimized images)
        # We'll test with a known image path
        url = urljoin(BASE_URL, '/_next/image?url=%2Fimages%2Fbiryani.jpg&w=1920&q=75')
        response = requests.get(url, timeout=10, allow_redirects=True)
        
        is_image = 'image' in response.headers.get('content-type', '').lower()
        
        passed = response.status_code == 200 and is_image
        
        details = f"Status: {response.status_code}, Image optimization: {'working' if passed else 'not working'}"
        return print_test("Next.js image optimization", passed, details)
    except Exception as e:
        return print_test("Next.js image optimization", False, f"Error: {str(e)}")

def main():
    print(f"\n{Colors.YELLOW}{'='*70}{Colors.END}")
    print(f"{Colors.YELLOW}Route and Static File Test Suite{Colors.END}")
    print(f"{Colors.YELLOW}Base URL: {BASE_URL}{Colors.END}")
    print(f"{Colors.YELLOW}{'='*70}{Colors.END}")
    
    results = []
    
    # Test main routes
    print(f"\n{Colors.BLUE}Testing Main Routes{Colors.END}")
    results.append(test_route('/', 200, ['Mr Bawarchi', 'Pakistani']))
    results.append(test_route('/menu', 200, ['menu', 'biryani']))
    results.append(test_route('/menu?category=bbq', 200, ['menu']))
    results.append(test_route('/about', 200, ['story', 'kitchen']))
    results.append(test_route('/contact', 200, ['contact']))
    results.append(test_route('/locations', 200, ['location']))
    results.append(test_route('/order', 200, ['cart', 'checkout']))
    
    # Test 404
    print(f"\n{Colors.BLUE}Testing 404 Page{Colors.END}")
    results.append(test_route('/unknown-page-that-does-not-exist', 404))
    
    # Test static files
    results.append(test_robots_txt())
    results.append(test_sitemap_xml())
    results.append(test_favicon())
    
    # Test metadata
    print(f"\n{Colors.BLUE}Testing Metadata and SEO{Colors.END}")
    results.append(test_metadata_tags('/', {
        'og:title': 'Mr Bawarchi',
        'og:type': 'website',
        'twitter:card': 'summary_large_image'
    }))
    
    # Test structured data
    results.append(test_structured_data('/'))
    
    # Test image optimization
    results.append(test_image_optimization())
    
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
        print(f"\n{Colors.GREEN}✅ All route and static file tests passed!{Colors.END}\n")
        return 0
    else:
        print(f"\n{Colors.YELLOW}⚠️  Some tests failed. Please review the output above.{Colors.END}\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
