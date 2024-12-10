"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import ImageUpload from "./_components/ImageUpload";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    message: "",
    description: "",
    about: "",
    file: null,
    image: null,
    userEmail: "", // Ensure this is part of initial state
  });

  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        userEmail: user.primaryEmailAddress?.emailAddress,
      }));
    }
  }, [user]);

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prevState) => ({ ...prevState, [fieldName]: fieldValue }));
  };

  const handleAddProductClick = async () => {
    try {
      
      console.log("Form Data:", formData);

      setLoading(true)
  
      if (!formData.image || !formData.file) {
        alert("Please select both an image and a file.");
        return;
      }
  
      const formDataObject = new FormData();
      formDataObject.append("image", formData.image);
      formDataObject.append("file", formData.file);
      formDataObject.append("data", JSON.stringify(formData));
  
      const result = await axios.post("/api/products", formDataObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Server Response:", result.data);

      if (result) {
        toast('Product added successfully!');
        router.push("/dashboard")
      }

      setLoading(false)
    } catch (error) {
      console.error("Error adding product:", error.response || error.message);
      alert("Failed to add product. Please try again.");
    }
  };
  

  const categoryOptions = [
    "Source Code",
    "UI Kit",
    "Icons",
    "Documents",
    "Fonts",
    "Themes",
    "Videos",
    "Illustration",
    "Others",
  ];

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold">Add New Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        <div className="flex flex-col gap-5">
          <ImageUpload
             onImageSelect={(e) => handleInputChange(e.target.name, e.target.files[0])}
          />
          <div>
            <h3>Upload File</h3>
            <Input
              type="file"
              name="file"
              onChange={(e) => handleInputChange(e.target.name, e.target.files[0])}
            />
          </div>
          <div>
            <h3>Message to user (100 words only)</h3>
            <Textarea
              name="message"
              maxLength="100"
              value={formData.message || ""}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h3>Product Title</h3>
            <Input
              name="title"
              placeholder="Ex. digital e-commerce in reactjs kit"
              value={formData.title || ""}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <h3>Price</h3>
            <Input
              name="price"
              placeholder="Ex. $10"
              type="number"
              value={formData.price || ""}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <h3>Category</h3>
            <Select
              value={formData.category || ""}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3>Description</h3>
            <Textarea
              name="description"
              value={formData.description || ""}
              maxLength="500"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <h3>About Product (Optional)</h3>
            <Textarea
              name="about"
              value={formData.about || ""}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <Button className="w-full" onClick={handleAddProductClick} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Add Product"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;

