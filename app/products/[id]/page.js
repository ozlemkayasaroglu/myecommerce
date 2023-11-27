"use client";
import { useState, useEffect } from "react";
import ProductData from "@/components/ProductData";
import Link from "next/link";
import Image from "next/image";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

export default function ShowProduct({ params }) {
  // const [products, setProducts] = useState([]);
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
      setId(data.id);
      setName(data.name);
      setCategory(data.category);
      setImage(data.image);
      setPrice(data.price);
      setDescription(data.description);
      setFeatures(data.features);
    }
    fetchData();
  }, []);

  const handleClickDelete = async (e) => {
    e.preventDefault();

    console.log()
    const response = await fetch(`http://localhost:3001/product/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Ürün güncelleme başarısız.',
      });
      throw new Error("Verileri güncellerken bir hata oluştu.");
    }
    const deletedUser = await response.json();
    MySwal.fire({
      icon: 'success',
      title: 'Ürün Silindi!',
      text: 'Ürün başarıyla silindi',
    });
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
          <div className="flex">
            <Image
              className="border rounded-md bg-white m-4 w-1/3"
              src={image}
              width={300}
              height={300}
              alt="Ürün Fotoğrafı"
            ></Image>
            <div className="border rounded-md bg-white m-4 w-2/3">
              <h2 className="text-3xl text-gray-600 font-semibold m-4 mt-12 mb-1 ">
                {name}
              </h2>

              <div className="ml-4 mb-6 mt-auto ">
                <span className="text-gray-400">{category}</span>
              </div>
              <div className="m-4">
                <span className="text-amber-400 text-4xl ">${price}</span>
              </div>
              <div className="m-4">
                <span className="text-purple-400">{description}</span>
              </div>
            </div>
          </div>
          <div className="m-4">
            <div className="p-5 border rounded-md bg-white w-full mx-auto">
              <span className="text-gray-500">{features}</span>
            </div>
          </div>
          <div className="m-4 flex">
            <div className="justify-between items-center mx-auto pr-6">
              <button
                className="bg-green-800 hover:bg-green-700 rounded-md py-2 mr-2 px-4 text-white"
                type="button"
              >
                <Link href={`/products/${id}/edit`}>Düzenle</Link>
              </button>
              <button
                className="bg-rose-800 hover:bg-rose-700 rounded-md py-2 px-4 text-white"
                type="button"
                onClick={handleClickDelete}
              >
                Sil
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
