"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const ImageUpload = ({ onImageSelect }) => {
  const [image, setImage] = useState();

  const handleChange = (e) => {
    onImageSelect(e);
    const file = e.target.files[0];

    if (file) {
      const show = new FileReader();
      show.onloadend = () => setImage(show.result);
      show.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Upload Product Image</h2>
      <Input
        type="file"
        id="imageUpload"
        name="image"
        className="hidden"
        onChange={handleChange}
      />
      <label htmlFor="imageUpload">
        <div className="p-2 flex justify-center items-center cursor-pointer border-4 border-black border-dotted bg-slate-200">
          {image ? (
            <Image src={image} alt="image" width={500} height={200} />
          ) : (
            <Image
              src={"/image-upload.jpg"}
              alt="image"
              width={100}
              height={100}
            />
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;

