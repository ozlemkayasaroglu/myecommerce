"use client";
import { useState } from "react";

export default function CreateProduct() {
  const [createProduct, setCreateProduct] = useState({
    id: "",
    image: "",
    name: "",
    category: "",
    price: "",
    description: "",
    features: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      if (!/^[0-9]+$/.test(value)) {
        alert(`Lütfen sadece numaralardan oluşan bir değer girin.`);
        return; 
      }
    }

    setCreateProduct((prevProduct) => ({
       ...prevProduct,
        [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createProduct),
      });

      if (!response.ok) {
        throw new Error("Ürün kaydı sırasında hata oluştu.");
      }

      console.log("Ürün başarıyla kaydedildi.");
    } catch (error) {
      console.log("Hata oluştu:", error);
    }
  };

  return (
    <div>
      <h1>Ürün Ekleme Sayfası</h1>
      <label>Ürün Görseli</label>
      <input
        placeholder="ürün görseli yükle"
        type="text"
        name="image"
        value={createProduct.image}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Yükle</button>

      <form>
        <label>İsim: </label>
        <input
          type="text"
          name="name"
          value={createProduct.name}
          onChange={handleChange}
        />
        <br />
        <label>Kategori: </label>
        <input
          type="text"
          name="category"
          value={createProduct.category}
          onChange={handleChange}
        />
        <br />
        <label>Açıklama: </label>
        <textarea rows="10" cols="40"
          type="text"
          name="description"
          value={createProduct.description}
          onChange={handleChange}
        />
        <br />
        <label>Fiyat: </label>
        <input
          type="text"
          name="price"
          value={createProduct.price}
          onChange={handleChange}
        />
        <br />
        <label>Özellikler: </label>
        <textarea rows="10" cols="40" 
          type="text"
          name="features"
          value={createProduct.features}
          onChange={handleChange}
        />

        <br />
        <button onClick={handleSubmit}>Gönder</button>
      </form>
    </div>
  );
}
