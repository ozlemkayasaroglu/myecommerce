"use client";
import { useEffect, useState } from "react";
import ProductData from "@/components/ProductData";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
const MySwal = withReactContent(Swal);

export default function EditProduct({ params }) {
  const { register, handleSubmit, setValue } = useForm();
  const [product, setProduct] = useState(null);
  const [id, setId] =useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ProductData(params.id);
        setId(data.id);
        setProduct(data);
        setValue("id", data.id);
        setValue("name", data.name);
        setValue("category", data.category);
        setValue("image", data.image);
        setValue("price", data.price);
        setValue("description", data.description);
        setValue("features", data.features);
      } catch (error) {
        console.error("veri getirme hatası:", error.message);
      }
    }
    fetchData();
  }, [params.id, setValue]);

  const onSubmit = async (data) => {
    try {
      setValue("name", data.name);
      setValue("category", data.category);
      setValue("image", data.image);
      setValue("price", data.price);
      setValue("description", data.description);
      setValue("features", data.features);

      const response = await fetch(`http://localhost:3001/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Hata!",
          text: "Ürün güncelleme başarısız.",
        });
        throw new Error("Ürünleri güncellerken bir hata oluştu.");
      }
      MySwal.fire({
        icon: "success",
        title: "Ürün Güncellendi!",
        text: "Ürün başarıyla güncellendi.",
      });

      const updatedProducts = await response.json();
      console.log("Ürünler başarıyla güncellendi:", updatedProducts);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Ürün güncelleme başarısız.",
      });

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
      {product && product.name ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-4 flex items-center space-x-4 ">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    className="w-full h-full object-cover "
                    src={product.image}
                    width={300}
                    height={300}
                    alt="Ürün fotoğrafı"
                  ></Image>
                </div>
              </div>

              <div className="flex flex-col pl-3">
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Ürün Görseli:
                </label>
                <div className="flex items-center mr-5">
                  <input
                    {...register("image")}
                    defaultValue={product.image}
                    className="w-40 px-2 py-1 border border-gray-300 rounded-l focus:outline-none w-96 mr-3"
                  />
                  <button className="bg-amber-400 hover:bg-amber-300 text-white font-bold py-1 px-4 rounded-r focus:outline-none">
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
                defaultValue={product.name}
                {...register("name")}
              />
              <br />
            </div>

            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold">
                Kategori :
              </label>

              <input
                className="border-2 border-gray-300 rounded p-2 w-full"
                defaultValue={product.category}
                {...register("category")}
              />

              <br />
            </div>

            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold">
                Fiyat :
              </label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-full"
                type="number"
                defaultValue={product.price}
                {...register("price")}
              />
              <br />
            </div>
            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold">
                Açıklama :
              </label>
              <textarea
                className="border-2 border-gray-300 rounded p-2 w-full"
                rows="5"
                cols="50"
                defaultValue={product.description}
                {...register("description")}
              />
              <br />
            </div>

            <div className="my-4">
              <label className="block text-gray-700 text-sm font-bold">
                Özellikler :
              </label>
              <textarea
                className="border-2 border-gray-300 rounded p-2 w-full"
                rows="10"
                cols="50"
                defaultValue={product.features}
                {...register("features")}
              />
              <br />
            </div>

            <button
              className="bg-amber-400 hover:bg-amber-300 text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Güncelle
            </button>
          </form>
        </>
      ) : (
        <div>Kullanıcı Düzenleme Sayfası Yükleniyor...</div>
      )}
    </div>
  );
}
