"use client";
import { useState, useEffect } from "react";
import ProductData from "@/components/ProductData";
import Link from "next/link";

export default function ShowProduct({ params }) {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");

  
  
useEffect(() => {
  async function fetchData() {
    const data = await ProductData(params.id);
    setId(data[0].id);
    setName(data[0].name);
    setCategory(data[0].category);
    setImage(data[0].image);
    setPrice(data[0].price);
    setDescription(data[0].description);
    setFeatures(data[0].features);
  }
  fetchData();
}, []);


  const handleClickDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3002/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Verileri güncellerken bir hata oluştu.");
    }
    const deletedUser = await response.json();
    console.log("Veriler başarıyla güncellendi:", deletedUser);
  };

  return (
    <div>
      <h1>Ürün Görüntüleme Sayfası</h1>
      <></>
      {id ? (
        <>
          <div>
            <img src={image} alt="Ürün Fotoğrafı" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Ürün Id</th>
                <td>{id}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Ürün İsim</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th>Açıklama</th>
                <td>{description}</td>
              </tr>
              <tr>
                <th>Kategori</th>
                <td>{category}</td>
              </tr>
              <tr>
                <th>Ürün Fiyat</th>
                <td>{price}</td>
              </tr>
              
              <tr>
                <th>Özet</th>
                <td>{features}</td>
              </tr>
            </tbody>
          </table>

          <button> <Link href={`/products/${id}/edit`}> Düzenle</Link></button>
          <button onClick={handleClickDelete}>Sil</button>
        </>
      ) : (
        <div>Ürün Görüntüleme Sayfası Yükleniyor...</div>
      )}
    </div>
  );
}
