import React, { useContext, useState } from "react";
import { CartContext } from "../_context/CartContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import ProductEditableOption from "./ProductEditableOption";
import { MoreVerticalIcon } from "lucide-react";
import { useRouter } from 'next/navigation'

const AddToCartButton = ({ product, editable = false }) => {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter() 

  const addToCartWithUser = async () => {

    if (user && product) {
      setLoading(true); // Set loading to true before the request

      try {
        // Add product to cart state locally
        setCart((prevCart) => [...prevCart, product]);

        // Make API call to add the item to the user's cart
        const result = await axios.post("/api/cart", {
          email: user?.primaryEmailAddress?.emailAddress,
          productId: product?.id,
        });

        // Handle success
        if (result.data?.success) {
          toast("Item Added to Cart");
        } else {
          toast("Item Added to Cart");
        }
      } catch (error) {
        // Handle error if the request fails
        console.error("Error adding to cart:", error);
        toast("Error adding item to cart");
      } finally {
        setLoading(false); // Reset loading state after the API call
      }
    }else{
     toast("Please login to add the item")
      router.push("/sign-in")
    }
  };

  return (
    <div>
      {/* Conditional Rendering based on editable prop */}
      {editable ? (
        <ProductEditableOption product={product}>
          <MoreVerticalIcon />
        </ProductEditableOption>
      ) : (
        <Button
          onClick={addToCartWithUser}
          disabled={loading}
          className="font-semibold py-2 rounded-md hover:bg-yellow-400 transition"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
