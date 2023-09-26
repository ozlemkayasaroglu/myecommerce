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
    <div>
      <h1>Ürün Listesi</h1>
      <button> <Link href={`/products/id/create`}> Ürün Ekle</Link></button>

      {loading ? (
        <p>Veriler yükleniyor...</p>
      ) : (
        <table>
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
                <Link href={`/products/${product.id}`}>{`${product.name}`}</Link>
                </td>
                <td>{product.category}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
