import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import RemoveButton from "./RemoveButton";

const CartProductItem = ({ product }) => {
  return (
    <Card className="flex gap-5">
      {/* Product Image */}
      <Image
        src={product?.imageUrl}
        alt={product?.title}
        width={70}
        height={70}
        className="h-[100px] w-[100px] object-cover"
      />

      {/* Product Details */}
      <div className="flex flex-col items-start justify-start">
        <h2 className="font-bold">{product?.title}</h2>
        <h3 className="font-bold text-yellow-600 text-lg">${product?.price}</h3>
        <RemoveButton product={product} />
      </div>
    </Card>
  );
};

export default CartProductItem;
