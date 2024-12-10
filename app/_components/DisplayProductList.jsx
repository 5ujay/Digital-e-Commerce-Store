import React from 'react';
import ProductCard from './ProductCard';
import { useUser } from '@clerk/nextjs';

const DisplayProductList = ({ productList, purchase=false }) => {
  const { user } = useUser();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
        {productList?.length > 0
          ? productList.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                user={user}
                purchase={purchase}  // Ensure purchase is passed here
              />
            ))
          : // Displaying loading skeletons
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                className="h-[200px] w-full bg-slate-200 rounded-lg animate-pulse"
                key={index}
              ></div>
            ))}
      </div>
    </div>
  );
};

export default DisplayProductList;
