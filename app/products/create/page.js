"use client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

export default function CreateProduct() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:3001/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ürün kaydı başarısız");
      }
      MySwal.fire({
        icon: "success",
        title: "Ürün başarıyla kaydedildi!",
        text: "Ürün başarıyla kaydedildi.",
      });

    
      router.push('/');

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Ürün kaydı başarısız.",
      });

      console.log("Hata oluştu:", error);
    }
  };

  return (
    <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
      <div className="flex space-x-4 bg-amber-400">
        <h1 className="space-x-4 bg-amber-400 hover:bg-amber-300 p-5">
          <p className="text-white text-m block uppercase tracking-wide font-bold">
            Ürün Kaydı Sayfası
          </p>
        </h1>
      </div>

      <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-6 pb-4">
            <div className="flex p-2 w-full ">
              <label className="block w-80 uppercase tracking-wide text-sm font-bold text-gray-700 mt-2">
                ÜRÜN FOTOĞRAFI:
              </label>

              <input
                className="appearance-none block w-full bg-white text-gray-700 rounded py-3 px-4"
                placeholder=" Dosya linki eklenmedi"
             
                {...register("image")}
              ></input>
            </div>

            <button
              className="px-8 py-3 text-sm font-semibold text-white bg-amber-300 hover:bg-amber-300 rounded-md rounded-md "
              type="submit"
            >
              Yükle
            </button>
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col pt-5">
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  İSİM:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="grid-name"
                  type="text"
                  name="name"
                  {...register("name", {
                    required: "İsim zorunludur.",
                    maxLength: {
                      value: 20,
                      message: "İsim maksimum 20 karakter olmalıdır.",
                    }
                  })}
                  aria-invalid={errors.name ? "true": "false"}
                />
              </div>

              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-category-name"
                >
                  KATEGORİ:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-category-name"
                  type="text"
                  name="category"
                  {...register("category", {
                    required: "Kategori zorunludur.",
                    maxLength: {
                      value: 20,
                      message: "Kategori maksimum 20 karakter olmalıdır.",
                    }
                  })}
                  aria-invalid={errors.category ? "true": "false"}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-features"
                >
                  özet:
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-features"
                  type="text"
                  name="features"
                  {...register("features")}
                  aria-invalid={errors.category ? "true": "false"}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-price"
                >
                  FİYAT:
                </label>
                
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="grid-price"
                  type="text"
                  name="price"
                  {...register("price", {
                    required: "Fiyat bilgisi zorunludur",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Sadece rakamlarla fiyat giriniz",
                    },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs italic">
                    {errors.price.message}
                  </p>)}
              
              </div>

              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-description"
                >
                  AÇIKLAMA:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-description"
                  type="text"
                  name="description"
                  {...register("description")}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                className="px-5 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
                type="submit"
              >
                Gönder
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
