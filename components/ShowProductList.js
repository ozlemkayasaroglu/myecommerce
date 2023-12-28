"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ShowProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/product");
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

       {products.slice(0, 20).map((product) => (
        <div key={product.id} className="border rounded p-4">
          <Link href={`/products/${product.id}`}>
            <div className="aspect-w-1 aspect-h-1">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>
          <p className="text-center text-gray-700 mt-2">${product.price}</p>
          <p className="text-center font-semibold mt-2">{product.name}</p>
        </div>
      ))}
    </div>
  );
}
