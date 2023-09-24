"use client";

import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import ProductsList from "../ProductsList/ProductsList";
import FilterForm from "../FilterForm/FilterForm";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import ErrorBoundary from "@/highOrderedComponents/ErrorBoundary";

const Filter = ({ categories, products }) => {
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 700);
  const [selectedCategory, setSelectedCategory] = useState("none");
  const filteredProducts = useFilteredProducts(
    products,
    debouncedFilter,
    selectedCategory
  );
  const router = useRouter();
  const filterQuery = decodeURIComponent(useSearchParams().get("filter"));
  const categoryQuery = decodeURIComponent(useSearchParams().get("category"));

  const validationSchema = Yup.object().shape({
    filter: Yup.string().min(3, "Min 3 letters required"),
  });

  const formik = useFormik({
    initialValues: {
      filter: filterQuery !== "null" ? filterQuery : "",
      category: categoryQuery !== "null" ? categoryQuery : "none",
    },
    validationSchema,
    validateOnChange: true,
  });

  useEffect(() => {
    if (!formik.errors.filter && !formik.isValidating) {
      router.push(
        `?filter=${formik.values.filter}&category=${encodeURIComponent(
          formik.values.category
        )}`
      );
    }
  }, [
    formik.values.filter,
    formik.values.category,
    formik.errors.filter,
    formik.isValidating,
    router,
  ]);

  useEffect(() => {
    if (!formik.errors.filter && !formik.isValidating) {
      setFilter(formik.values.filter);
    }
  }, [formik.values.filter, formik.errors.filter, formik.isValidating]);

  useEffect(() => {
    if (!formik.errors.filter && !formik.isValidating) {
      setSelectedCategory(formik.values.category);
    }
  }, [formik.values.category, formik.errors.filter, formik.isValidating]);

  return (
    <>
      <FilterForm formik={formik} categories={categories} />
      <ErrorBoundary
        fallback={
          <strong style={{ textAlign: "center" }}>
            Oops. Something went wrong
          </strong>
        }
      >
        <ProductsList products={filteredProducts} />
      </ErrorBoundary>
    </>
  );
};

Filter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
      asin: PropTypes.string,
      price: PropTypes.string,
      bsr_category: PropTypes.string,
      link: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export default Filter;
