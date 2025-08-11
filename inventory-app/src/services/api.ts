export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  stock?: number;
};

type FetchProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const BASE_URL = 'https://dummyjson.com';

export async function fetchProductsApi(limit: number = 100): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data: FetchProductsResponse = await res.json();
  return data.products;
}