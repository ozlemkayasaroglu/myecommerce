"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import UserData from "@/components/UserData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const MySwal = withReactContent(Swal);

export default function EditUser({ params }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await UserData(params.id);
        setId(data.id);
        setUser(data);
      } catch (error) {
        console.error("veri getirme hatası", error.message);
      }
    }
    fetchData();
  }, [params.id, setValue]);

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${id}`, {
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
          text: "Kullanıcı güncelleme başarısız.",
        });
        throw new Error("Kullanıcıları güncellerken bir hata oluştu.");
      }
      MySwal.fire({
        icon: "success",
        title: "Kullanıcı Güncellendi!",
        text: "Kullanıcı başarıyla güncellendi.",
      });

      const updatedUser = await response.json();

      console.log("Veriler başarıyla güncellendi:", updatedUser);
      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Kullanıcı güncelleme başarısız.",
      });
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
      <div className="flex space-x-4 bg-amber-400 ">
        <h1 className="space-x-4 bg-amber-400 hover:bg-amber-300 p-5">
          <p className="text-white text-m block uppercase tracking-wide font-bold">
            Kullanıcı Düzenleme Sayfası
          </p>
        </h1>
      </div>
      {user && user.firstName ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-4 flex items-center space-x-4 ">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    className="w-full h-full object-cover "
                    src={user.image}
                    width={300}
                    height={300}
                    alt="Profil fotoğrafı"
                  ></Image>
                </div>
              </div>

              <div className="flex flex-col pl-3">
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Profil Fotoğrafı:
                </label>
                <div className="flex items-center mr-5">
                  <input
                    className="w-40 px-2 py-1 border border-gray-300 rounded-l focus:outline-none w-96 mr-3"
                    {...register("image")}
                    defaultValue={user.image}
                  />
                  <button className="bg-amber-400 hover:bg-amber-300 text-white font-bold py-1 px-4 rounded-r focus:outline-none">
                    Güncelle
                  </button>
                </div>
              </div>
            </div>

            <div className="flex w-full pl-3">
              <div className="m-4 w-1/2">
                <label className="block text-gray-700 text-sm font-bold">
                  İsim:
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-full"
                  defaultValue={user.firstName}
                  {...register("firstName", {
                    required: "İsim zorunludur.",
                    maxLength: {
                      value: 20,
                      message: "İsim maksimum 20 karakter olmalıdır.",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Sadece harf içermelidir.",
                    },
                  })}
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs italic mt-1" role="alert">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="m-4 w-1/2">
                <label className="block text-gray-700 text-sm font-bold">
                  Soyisim:
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-full"
                  defaultValue={user.lastName}
                  {...register("lastName", {
                    required: "Soyisim zorunludur.",
                    maxLength: {
                      value: 30,
                      message: "Soyisim maksimum 20 karakter olmalıdır.",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Sadece harf içermelidir.",
                    },
                  })}
                  aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs italic mt-1" role="alert">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex w-full pl-3">
              <div className="m-4 w-1/2 ">
                <label className="block text-gray-700 text-sm font-bold">
                  Telefon Numarası:
                </label>

                <input
                  className="border-2 border-gray-300 rounded p-2 w-full"
                  id="grid-phone"
                  type="text"
                  defaultValue={user.phone}
                  {...register("phone", {
                    required: "Telefon numarası zorunludur",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Sadece rakamlarla telefon numarası giriniz",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs italic">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                id="grid-email"
                type="text"
                name="email"
                defaultValue={user.email}
                {...register("email", {
                  required: "E-posta adresi zorunludur",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Geçerli bir e-posta adresi giriniz",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="leading-3 leading-normal border-b border-gray-300 mb-4 mt-4"></div>

            <h2 className="text-gray-400 text-md font-bold uppercase ml-6 ">
              Adres-1:
            </h2>
            <div className="flex w-full pl-3">
              <div className="m-4 w-1/2">
                <label className="block text-gray-700 text-sm font-bold">
                  Mahalle-Sokak:
                </label>
                <textarea
                  className="border-2 border-gray-300 rounded p-2 w-full"
                  {...register("address.address")}
                  defaultValue={user.address.address}
                />
              </div>
              <div className="m-4 w-1/2">
                <label className="block text-gray-700 text-sm font-bold">
                  Şehir:
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-full"
                  {...register("address.city")}
                  defaultValue={user.address.city}
                />
              </div>
            </div>

            <h2 className="text-gray-400 text-md font-bold uppercase ml-6 ">
              Adres-2:
            </h2>
            <div className="flex w-full pl-3">
              <div className="m-4 w-1/2">
                <label className="block text-gray-700 text-sm font-bold">
                  Mahalle-Sokak:
                </label>
                <textarea
                  className="border-2 border-gray-300 rounded p-2 w-full"
                  {...register("company.address")}
                  defaultValue={user.company.address}
                />
              </div>
              <div className="m-4 w-1/2">
                <label className="block text-gray-700 text-sm font-bold">
                  Şehir:
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-full"
                  {...register("company.city")}
                  defaultValue={user.company.city}
                />
              </div>
            </div>

            <div className="flex w-full pl-3">
              <div className="m-4 w-full">
                <label className="block text-gray-700 text-sm font-bold">
                  Şirket Adı:
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-full"
                  {...register("company.name")}
                  defaultValue={user.company.name}
                />
              </div>
            </div>

            <button
              className="bg-amber-400 hover:bg-amber-300 ml-6 text-white font-bold py-2 px-4 rounded mt-4"
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
