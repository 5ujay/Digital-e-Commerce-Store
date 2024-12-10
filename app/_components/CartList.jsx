import React, { useContext, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartContext } from "../_context/CartContext";
import CartProductItem from "./CartProductItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartList = ({ children }) => {
  const { cart, setCart } = useContext(CartContext);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // state to control the sheet's open/close

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.price;
    });
    return total;
  };

  const handleCheckoutClick = () => {
    // Close the sheet when checkout is clicked
    setIsSheetOpen(false);
  };

  return (
    <div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger onClick={() => setIsSheetOpen(true)}>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription asChild>
              <div>
                <div className="flex flex-col gap-2 mt-5 max-h-[500px] overflow-auto">
                  {/* Cart items list with scroll */}
                  {cart.map((product, index) => (
                    <CartProductItem product={product} key={index} />
                  ))}
                </div>

                <div className="mt-5">
                  <h2 className="font-bold text-2xl flex justify-between text-black">
                    Total :{" "}
                    <span className="text-green-600">${calculateTotal()}</span>
                  </h2>

                  <Link href={"/checkout"}>
                    <Button
                      className="w-full mt-2"
                      onClick={handleCheckoutClick} // close the sheet when checkout is clicked
                    >
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartList;
