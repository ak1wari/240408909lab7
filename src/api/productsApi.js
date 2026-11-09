const BASE_URL = "https://dummyjson.com/products";

async function readResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

export async function fetchProducts(signal) {
  const response = await fetch(`${BASE_URL}?limit=100`, { signal });
  const result = await readResponse(response);
  return result.products;
}

export async function fetchProduct(id, signal) {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, { signal });
  return readResponse(response);
}