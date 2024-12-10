import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/app/_components/ProductCard";

const SimilarProduct = ({ category }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      fetchSimilarProducts();
    }
  }, [category]);

  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.get(`/api/products?category=${category}&limit=3`);
      setSimilarProducts(response.data);
    } catch (err) {
      setError("Failed to fetch similar products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading similar products...</p>}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProduct;
