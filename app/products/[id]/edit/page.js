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
      } catch (error) {
        console.error("veri getirme hatası:", error.message);
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
            Ürün Düzenleme Sayfası
          </p>
        </h1>
      </div>
      {name ? (
        <>
          <form>
            <div className="my-4 flex items-center space-x-4 ">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    className="w-full h-full object-cover "
                    src={image}
                    alt="Ürün fotoğrafı"
                  />
                </div>
              </div>

              <div className="flex flex-col pl-3">
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Ürün Görseli:
                </label>
                <div className="flex items-center mr-5">
                  <input
                    className="w-40 px-2 py-1 border border-gray-300 rounded-l focus:outline-none w-96 mr-3"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                  />
                  <button
                    className="bg-amber-400 hover:bg-amber-300 text-white font-bold py-1 px-4 rounded-r focus:outline-none"
                    onClick={handleClickUpdate}
                  >
                    Güncelle
                  </button>
                </div>
              </div>
            </div>

            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold">
                İsim :
              </label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-full"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <br />
            </div>

            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold">
                Kategori :
              </label>

              <input
                className="border-2 border-gray-300 rounded p-2 w-full"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />

              <br />
            </div>

            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold">
                Fiyat :{" "}
              </label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-full"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <br />
            </div>
            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold">
                Açıklama :{" "}
              </label>
              <textarea
                className="border-2 border-gray-300 rounded p-2 w-full"
                rows="5"
                cols="50"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <br />
            </div>

            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold">
                Özellikler :{" "}
              </label>
              <textarea
                className="border-2 border-gray-300 rounded p-2 w-full"
                rows="10"
                cols="50"
                onChange={(e) => setFeatures(e.target.value)}
                value={features}
              />
              <br />
            </div>
          </form>
          <button
            className="bg-amber-400 hover:bg-amber-300 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleClickUpdate}
          >
            Güncelle
          </button>
        </>
      ) : (
        <div>Kullanıcı Düzenleme Sayfası Yükleniyor...</div>
      )}
    </div>
  );
}
