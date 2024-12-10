import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-green-700 p-10 px-6 md:px-28 lg:px-36">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between items-center">
        {/* Left Side (Text and Buttons) */}
        <div className="flex flex-col justify-center gap-6 md:gap-10">
          <h2 className="font-extrabold text-3xl md:text-5xl text-white">
            Speed Your Creative Workflow
          </h2>
          <p className="text-gray-200 text-lg md:text-2xl">
            Join a growing community of designers, creators, and makers
            around the world.
          </p>
          <div className="flex gap-5">
            <Link href={"/explore"}>
              <Button className="bg-primary hover:bg-yellow-500 text-sm md:text-base">
                Explore
              </Button>
            </Link>
            <Link href={"/dashboard"}>
              <Button className="bg-red-500 hover:bg-red-600 text-sm md:text-base">
                Sell
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="flex items-center justify-center">
          <Image
            src={"/digital_product_home.png"}
            alt="home_img"
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
