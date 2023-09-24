import { useMemo } from "react";

const useFilteredProducts = (products, filter, category) => {
  return useMemo(() => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(filter.toLowerCase()) &&
        (category === "none" || product.bsr_category === category)
      );
    });
  }, [products, filter, category]);
};

export default useFilteredProducts;
