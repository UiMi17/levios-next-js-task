"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GoBackButton from "../GoBackButton/GoBackButton";

export default function ProductDetails({ products }) {
  const [currentProduct, setCurrentProduct] = useState(null);
  const paramAsin = useParams();

  useEffect(() => {
    const findCurrentProduct = () => {
      const result = products.filter(({ asin }) => asin === paramAsin.asin);
      setCurrentProduct(...result);
    };
    findCurrentProduct();
  }, [products, paramAsin]);

  return (
    currentProduct && (
      <div className="min-h-screen bg-slate-100">
        <GoBackButton />
        <div className="flex flex-col items-center gap-12 mt-4">
          <h1 className="text-4xl font-bold text-center text-slate-900">
            {currentProduct.name}
          </h1>
          <h2 className="text-2xl font-medium text-center text-slate-700">
            Category: {currentProduct.bsr_category}
          </h2>
          <a
            href={currentProduct.link}
            target="_blank"
            rel="noreferrer noopener"
            className="relative w-96 group"
          >
            {/* <img
              src={currentProduct.img}
              alt={currentProduct.name}
              className="w-fit h-auto object-cover mx-auto shadow-md rounded-md group-hover:scale-110 transition-transform ease-in-out delay-200"
            /> */}
            <picture>
              <img
                src={currentProduct.img}
                alt={currentProduct.name}
                className="w-fit h-auto object-cover mx-auto shadow-md rounded-md group-hover:scale-110 transition-transform ease-in-out delay-200"
              />
            </picture>
            <div className="absolute flex justify-center items-center inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-all ease-linear delay-400 scale-110 rounded-md">
              <p className="text-gray-300">Look on Amazon</p>
            </div>
          </a>

          <p className="text-4xl font-semibold text-center text-slate-800">
            Price: <span className="underline">{currentProduct.price}</span>!
          </p>
        </div>
      </div>
    )
  );
}
