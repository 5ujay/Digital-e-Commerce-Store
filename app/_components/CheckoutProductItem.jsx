import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import RemoveButton from "./RemoveButton";

const CheckoutProductItem = ({ product }) => {
  return (
    <Card className="flex gap-6 p-4 rounded-xl shadow-lg bg-gradient-to-r from-[#f0e5c9] via-[#f5e1a4] to-[#f2b97f] hover:shadow-2xl transition-shadow">
      {/* Product Image */}
      <Image
        src={product?.imageUrl}
        alt={product?.title}
        width={100}
        height={100}
        className="h-[100px] w-[100px] object-cover rounded-lg border-2 border-yellow-500"
      />

      {/* Product Details */}
      <div className="flex flex-col items-start justify-center space-y-2">
        <h2 className="font-serif text-xl text-[#3a3a3a] font-bold">{product?.title}</h2>
        <h3 className="font-sans text-lg text-[#c49e36] font-semibold">{product?.category}</h3>
        <RemoveButton product={product} className="mt-2 bg-[#c49e36] text-white hover:bg-[#a57b2e] transition-colors duration-300" />
      </div>
    </Card>
  );
};

export default CheckoutProductItem;
