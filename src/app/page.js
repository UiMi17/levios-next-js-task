import Filter from "@/components/ProductsFilter/ProductsFilter";
import { fetchProducts } from "@/services/mockAPI";

export default async function Products() {
  const products = await fetchProducts();
  const categories = [
    ...new Set(products.map(({ bsr_category }) => bsr_category)),
  ];

  return (
    <>
      <Filter categories={categories} products={products} />;
    </>
  );
}
