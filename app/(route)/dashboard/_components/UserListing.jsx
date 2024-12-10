"use client";
import ProductCard from "@/app/_components/ProductCard";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserListing = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    user && getUserListing();
  }, [user]);

  const getUserListing = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        "/api/products?email=" + user?.primaryEmailAddress?.emailAddress
      );
      console.log("API Result: ", result.data);
      setListing(result.data);
    } catch (error) {
      console.error("Error fetching user listings:", error);
      alert("Failed to load product listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="mt-5">
      <div className="flex justify-between w-full">
        <h2 className="font-bold text-xl">Listing</h2>
        <Link href={"/add-product"}>
          <Button>+ Add New Product</Button>
        </Link>
      </div>

      <div>
        {listing?.length <= 0 && (
          <h1 className="font-bold text-3xl text-center text-gray-300">
            No Listing Found !
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
          {
            listing.map((product , index)=>(
              <ProductCard product={product} key={index} editable={true}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default UserListing;
