const BASE_URL = "https://dummyjson.com/products";

async function readResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error("Invalid response from server");
  }
}

async function request(url, signal) {
  try {
    const response = await fetch(url, { signal });
    return await readResponse(response);
  } catch (error) {
    if (error.name === "AbortError") throw error;
    if (error.message === "Invalid response from server" || error.message.startsWith("Request failed")) {
      throw error;
    }
    throw new Error("Network error. Please try again.");
  }
}

export async function fetchProducts(signal) {
  const result = await request(`${BASE_URL}?limit=100`, signal);
  return result.products;
}

export async function fetchProduct(id, signal) {
  return request(`${BASE_URL}/${encodeURIComponent(id)}`, signal);
}