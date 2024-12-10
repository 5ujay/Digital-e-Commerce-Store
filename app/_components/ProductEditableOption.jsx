import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChartArea, PenBox, Trash2 } from "lucide-react";
import DeleteConfirmationDialouge from "./DeleteConfirmationDialouge";
import axios from "axios";

const ProductEditableOption = ({ children,product }) => {

  const deleteProduct = async()=>{
    console.log(product);
    const result = await axios.delete("/api/products?productId="+product?.id)
    console.log(result);
    window.location.reload()
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent>
          <ul>
            <li className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer">
              <PenBox /> Edit
            </li>
            <li className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer text-green-500">
              <ChartArea /> Analytics
            </li>
            <DeleteConfirmationDialouge deleteProduct={deleteProduct}>
              <li className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer text-red-500">
                <Trash2 /> Delete
              </li>
            </DeleteConfirmationDialouge>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProductEditableOption;
