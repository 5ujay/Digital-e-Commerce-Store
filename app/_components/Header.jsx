import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, {  useContext } from "react";
import { CartContext } from "../_context/CartContext";
import CartList from "./CartList";

const Header = () => {
  const MenuList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Store",
      path: "/",
    },
    {
      name: "Explore",
      path: "/explore",
    },
  ];

  const {cart, setCart}= useContext(CartContext)

  return (
    <div className="flex justify-between items-center p-4 px-6 md:px-32 lg:px-48 bg-primary border-b-4 border-black">
      {/* Logo */}
      <Link href={"/"}>
      <h2 className="font-bold text-lg md:text-xl bg-black text-white px-2 py-1">
        DS
      </h2>
      </Link>

      {/* Menu List */}
      <ul className="sm:flex gap-5 space-x-4 md:space-x-10 flex-wrap justify-center md:justify-start hidden">
        {MenuList.map((item, index) => (
          <li
            key={index}
            className="hover:border-2 hover:border-black px-2 cursor-pointer text-sm md:text-base"
          >
            <Link href={item?.path}>{item?.name}</Link>
          </li>
        ))}
      </ul>

      {/* Shopping Bag & Button */}
      <div className="flex items-center gap-4 md:gap-6">
          <CartList>
          <div className="flex items-center justify-center">
          <Badge className="rounded-full bg-black text-white hover:bg-black">{cart?.length}</Badge>
          <ShoppingBag />
          </div>
          </CartList>
        <Link href={"/dashboard"}>
          <Button className="bg-red-500 hover:bg-red-600 text-sm md:text-base">
            Start Selling
          </Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
