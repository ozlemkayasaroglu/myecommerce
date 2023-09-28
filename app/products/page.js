"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductLists() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3002/products");
        if (!response.ok) {
          throw new Error("Veriler alınamadı");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-x-4 ">
      <h1 className="space-x-4 ml-auto bg-amber-400 p-5 text-white text-m ps-5 ">Ürün Listesi</h1>
      
      <div className="container mx-auto flex grid-rows-2 justify-between items-center pt-5">
        

        {loading ? (
          <p>Veriler yükleniyor...</p>
        ) : (
          <table className="table-auto">
            <thead>
              <tr>
                <th>Ürün id</th>
                <th>İsim</th>
                <th>Kategori</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.name}>
                  <td>{product.id}</td>
                  <td>
                    <Link
                      href={`/products/${product.id}`}
                    >{`${product.name}`}</Link>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

<button className="bg-purple-600 hover:bg-purple-500 rounded-lg w-32">
          <Link href={`/products/id/create`}>
            <p className="text-white p-2 ">Yeni Ürün Ekle</p>
          </Link>
        </button>
      </div>

     
    </div>
  );
}
