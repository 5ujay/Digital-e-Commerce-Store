"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ProductCard from "@/app/_components/ProductCard";
import axios from "axios";
import Link from "next/link";
import DisplayProductList from "./DisplayProductList";

const ProductsList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    GetProductlist();
  }, []);

  const GetProductlist = async () => {
    try {
      const result = await axios.get("/api/products?limit=6");
      // Assuming the product data is in result.data, update the state accordingly
      setProductList(result.data);  // Accessing data properly
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-xl flex justify-between">
        Featured
        <span>
          <Link href={"/explore"}>
          <Button>View All</Button>
          </Link>
        </span>
      </h2>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
        {productList?.length > 0 ? (
          productList.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))
        ) : (
          // Displaying loading skeletons
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div className="h-[200px] w-full bg-slate-200 rounded-lg animate-pulse" key={index}></div>
          ))
        )}
      </div> */}
      <DisplayProductList productList={productList}/>
    </div>
  );
};

export default ProductsList;
