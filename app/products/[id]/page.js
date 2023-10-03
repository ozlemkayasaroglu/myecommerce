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
    <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
      <div className="flex space-x-4 bg-amber-400 ">
        <h1 className="space-x-4 bg-amber-400 hover:bg-amber-300 p-5">
          <p className="text-white text-m block uppercase tracking-wide font-bold">
            Ürün Görüntüleme Sayfası
          </p>
        </h1>
      </div>
      <></>
      {id ? (
        <>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="flex">
              <div className="p-4 w-1/2">
                <img
                  className="mx-auto w-full border rounded-md"
                  src={image}
                  alt="Ürün Fotoğrafı"
                />
              </div>
              <div className="p-4 w-1/2 w-full border rounded-md">
                <table className="min-w-full ">
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
              </div>
            </div>
            <div className="flex justify-end p-5 space-x-10">
              <button
                className="bg-emerald-400 hover:bg-emerald-300 rounded-lg w-24"
                type="button"
              >
                <p className="text-white p-2 ">
                  <Link href={`/products/${id}/edit`}> Düzenle</Link>
                </p>
              </button>
              <button
                className="bg-rose-400 hover:bg-rose-300 rounded-lg w-24"
                type="button"
                onClick={handleClickDelete}
              >
                <p className="text-white p-2">Sil</p>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>Ürün Görüntüleme Sayfası Yükleniyor...</div>
      )}
    </div>
  );
}
