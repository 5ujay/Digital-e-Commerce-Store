import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import { Button } from "@/components/ui/button";
import axios from "axios"; // <-- Make sure axios is imported
import { toast } from "sonner"; // Make sure toast is correctly imported

const RemoveButton = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);

  const removeItem = async () => {
    if (!product?.id) {
      toast.error("Invalid product data.");
      return;
    }

    try {
      // Send delete request to the backend
      const response = await axios.delete(`/api/cart?recordId=${product.id}`);

      if (response?.data?.message === "Item deleted successfully") {
        // Update cart state after successful deletion
        const updatedCart = cart.filter((item) => item.id !== product.id);
        setCart(updatedCart);
        toast("Item Deleted!");
      } else {
        toast.error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting the item.");
    }
  };

  return (
    <div>
      <Button onClick={removeItem}>
        <h2 className="text-red-500 cursor-pointer">Remove</h2>
      </Button>
    </div>
  );
};

export default RemoveButton;
