"use client";
import DisplayProductList from "@/app/_components/DisplayProductList";
import SortProducts from "@/app/_components/SortProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [productList, setProductList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchtext, setSearchText] = useState("");
  const [sort, setSort] = useState({
    label: "New",
    field: "id",
    order: "desc",
  });

  useEffect(() => {
    if (sort) {
      setProductList([]);
      GetAllProductsList(0);
    }
  }, [sort]);

  // Fetch the initial list of products when the component mounts
  useEffect(() => {
    GetAllProductsList(offset);
  }, []);

  const GetAllProductsList = async (offset_) => {
    try {
      const result = await axios.post("/api/all-products", {
        limit: 6,
        offset: offset_,
        searchInput: searchtext,
        sort: sort ?? [],
      });

      if (productList.length == 0) {
        setProductList(result.data);
      } else {
        setProductList((prev) => [...prev, ...result.data]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-3xl">Explore</h2>
      <div>
        <div className="flex items-center gap-2">
          <h4>Search : </h4>
          <Input
            className="w-80"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={() => {
              GetAllProductsList(0);
              setProductList([]);
            }}
          >
            <Search /> Search
          </Button>
          <SortProducts onSortChange={(value) => setSort(value)} />
        </div>
      </div>
      <DisplayProductList productList={productList} />
      {/* Pass productList as a prop to display products */}
      <div className="flex items-center justify-center mt-5">
        <Button onClick={() => GetAllProductsList(offset + 6)}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Explore;
