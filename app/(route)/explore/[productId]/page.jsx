"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SimilarProduct from "./_component/SimilarProduct";
import AddToCartButton from "@/app/_components/AddToCartButton";

const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetProductDetail();
  }, [productId]);

  const GetProductDetail = async () => {
    try {
      const result = await axios.get(`/api/products?id=${productId}`);
      setProductDetail(result.data);
    } catch (err) {
      setError("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    productDetail && (
      <div className="mt-10">
        <div>
          <h2>Back</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-10">
          <Card className="flex items-center justify-center max-h-[400px]">
            <Image
              src={productDetail?.imageUrl}
              alt="image"
              width={400}
              height={400}
              className="h-[400px] w-full object-contain"
            />
          </Card>

          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-3xl">{productDetail?.title}</h2>
            <Badge className="text-black w-fit">{productDetail?.category}</Badge>
            <h2 className="font-bold text-3xl text-yellow-600">
              ${productDetail?.price}
            </h2>

            <p>
              The {productDetail?.category} will send to your register email id
              once you purchase this digital content
            </p>

            {/* <Button className="w-full">Add to Cart</Button> */}
            <AddToCartButton product={productDetail}/>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>{productDetail?.description}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>About the product</AccordionTrigger>
                <AccordionContent>{productDetail?.about}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-10">
          <SimilarProduct category={productDetail?.category} />
        </div>
      </div>
    )
  );
};

export default ProductDetails;
