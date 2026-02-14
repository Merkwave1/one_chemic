// Base URL for API - reads from environment variable
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7037";

// Auth Endpoints
export const LOGIN_ENDPOINT = `${API_BASE_URL}/api/user/login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}/api/users/register`;

// Product Endpoints
export const PRODUCTS_ENDPOINT = `${API_BASE_URL}/api/product`; // GET all products
export const PRODUCT_BY_ID_ENDPOINT = (id: number | string) =>
  `${API_BASE_URL}/api/product/${id}`; // GET single product by ID
export const ADD_PRODUCT_ENDPOINT = `${API_BASE_URL}/api/product`; // POST
export const UPDATE_PRODUCT_ENDPOINT = (id: number | string) =>
  `${API_BASE_URL}/api/product/${id}`; // PUT
export const DELETE_PRODUCT_ENDPOINT = (id: number | string) =>
  `${API_BASE_URL}/api/product/${id}`; // DELETE

// Image base URL for displaying product images
export const IMAGE_BASE_URL = API_BASE_URL;
