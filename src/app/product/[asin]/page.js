import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { fetchProducts } from "@/services/mockAPI";

export default async function Product() {
  const products = await fetchProducts();

  return <ProductDetails products={products} />;
}
