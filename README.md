# Assignment 7 — Online Shop

Student: Daniyar Nurdinov
Student ID: 240408909

# File Organization

api — API requests
hooks — custom hooks
context — authentication
store — Zustand cart
components — reusable components
pages — application pages

# State Management

1. Why these state solutions?

Context manages authentication, Zustand manages the cart, URL parameters store filters, useFetch handles product data, and localStorage persists the theme.

2. Context vs Zustand

Context is suitable for authentication, while Zustand is better for frequently changing shared cart state and selective subscriptions.

3. useFetch

It shares fetching logic, loading, errors, and cancellation. Each hook instance has independent state.

4. Product ID

The ID from useParams is a string. It is passed to the API to fetch the selected product.

5. ProtectedRoute

It protects the UI, not the API. Real security requires server-side authentication and authorization.

6. Page refresh

A static server may return 404 for /products/3. It needs to redirect application routes to index.html

# Challenges

The main challenges were API requests, URL-based filters, and persistent cart state.

# Demo Login

Email: 240408909@biruni.edu.tr
Password: demo123456