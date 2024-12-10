"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { CartContext } from "./_context/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Footer from "./_components/Footer";

const Provider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  // Fetch cart items when user is available
  useEffect(() => {
    user && CheckIsNewUser();
    user && GetCartItems();
  }, [user]); // Only run effect when user changes

  // Check if the user is new (send data to backend)
  const CheckIsNewUser = async () => {
    try {
      const result = await axios.post("/api/user", {
        user: user,
      });
      console.log(result.data);
    } catch (error) {
      console.error("Error checking if user is new:", error);
    }
  };

  const GetCartItems = async () => {
    try {
      const result = await axios.get(
        "/api/cart?email=" + user?.primaryEmailAddress?.emailAddress
      );
      console.log(result.data);
      // You can also set cart state here if you want to update cart
      setCart(result.data);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  };

  return (
    <div>
      {/* Provide cart state via context */}
      <CartContext.Provider value={{ cart, setCart }}>
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
          <Header />
          <div>{children}</div>
          <Footer/>
        </PayPalScriptProvider>
      </CartContext.Provider>
    </div>
  );
};

export default Provider;
