"use client";
import { useEffect, useState } from "react";
import ProductData from "@/components/ProductData";

export default function EditProduct({ params }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");

  useEffect(() => {
    async function fetchData() {
        try {
      const data = await ProductData(params.id);
      setId(data[0].id);
      setName(data[0].name);
      setCategory(data[0].category);
      setImage(data[0].image);
      setPrice(data[0].price);
      setDescription(data[0].description);
      setFeatures(data[0].features);
    }
    catch (error) {
        console.error("veri getirme hatası:" , error.message);
    }
}
    fetchData();
  }, [params.id]);

  const handleClickUpdate = async (e) => {
    e.preventDefault();
    try {
      const productToUpdate = {
        id: id,
        name: name,
        category: category,
        image: image,
        price: price,
        description: description,
        features: features,
      };

      const response = await fetch(`http://localhost:3002/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToUpdate),
      });

      if (!response.ok) {
        throw new Error("Ürünleri güncellerken bir hata oluştu.");
      }
      const updatedProducts = await response.json();
      console.log("Ürünler başarıyla güncellendi:", updatedProducts);
    } catch (error) {
      console.log(error.message);
    }

  };

  return (
    <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
      <div className="flex space-x-4 bg-amber-400 ">
        <h1 className="space-x-4 bg-amber-400 hover:bg-amber-300 p-5">
          <p className="text-white text-m block uppercase tracking-wide font-bold">
            Ürün Görüntüleme Sayfası
          </p>
        </h1>
      </div>
      {name ? (
        <><form>
                  <img src={image} alt="Ürün fotoğrafı" />
                  <br />

                  <label>Ürün Görseli : </label>
                  <input onChange={(e) => setImage(e.target.value)} value={image} />
                  <button onClick={handleClickUpdate}>Güncelle</button>
                  <br />
                  
                  <label>İsim :</label>
                  <input onChange={(e) => setName(e.target.value)} value={name} />
                  <br />
                  <label>Kategori :</label>
                
                  <input onChange={(e) => setCategory(e.target.value)} value={category} />
                
                  <br />
                  <label>Fiyat : </label>
                  <input onChange={(e) => setPrice(e.target.value)} value={price} />
                  <br />

                  <label>Açıklama : </label>
                  <textarea rows="5" cols="50" onChange={(e) => setDescription(e.target.value)} value={description} />
                  <br />
                  <label>Özellikler : </label>
                  <textarea rows="10" cols="50" onChange={(e) => setFeatures(e.target.value)} value={features} />
                  <br />
              </form><button onClick={handleClickUpdate}>Güncelle</button></>
      ) : (
        <div>Kullanıcı Düzenleme Sayfası Yükleniyor...</div>
      )}
    </div>
  );
}
