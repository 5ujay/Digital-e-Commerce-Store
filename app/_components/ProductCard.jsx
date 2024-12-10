import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product, editable = false, purchase }) => {
  return (
    <div>
      <Card className="max-w-sm shadow-lg p-2">
        {/* Product Image */}
        <Link href={"/explore/" + product?.id}>
          <div className="relative w-full h-56 border-2 border-black">
            <Image
              className="object-cover"
              src={product?.imageUrl || "/digital_product_home.png"}
              alt={product?.title || "Product Image"}
              layout="fill"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="p-2">
          {/* Product Title */}
          <h2 className="font-bold text-lg text-gray-800 mb-2 truncate">
            {product?.title || "No Title"}
          </h2>

          {/* Product Price */}
          <p className="text-green-600 font-bold text-xl mb-2">
            ${product?.price || "0.00"}
          </p>

          <div className="flex justify-between items-center">
            {/* User Info and Add to Cart Button */}
            {!purchase && (
              <>
                {/* Display User Info */}
                <div className="flex items-center">
                  <Image
                    className="rounded-full"
                    src={product?.user?.image || "/digital_product_home.png"}
                    alt={product?.user?.name || "User"}
                    width={40}
                    height={40}
                  />
                  <span className="ml-3 text-sm text-gray-700 font-semibold">
                    {product?.user?.name || "Anonymous"}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <AddToCartButton product={product} editable={editable} />
              </>
            )}

            {purchase && (
              // Show Download Button when 'purchase' is true
              <Link href={product?.fileUrl || "#"} passHref>
                <Button>Download Content</Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
