"use client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

export default function CreateUser() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Kullanıcı kaydı sırasında bir hata oluştu.");
      }
      MySwal.fire({
        icon: "success",
        title: "Ürün başarıyla kaydedildi!",
        text: "Ürün başarıyla kaydedildi.",
      });
      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Ürün kaydı başarısız.",
      });
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
      <div className="flex space-x-4 bg-amber-400">
        <h1 className="space-x-4 bg-amber-400 hover:bg-amber-300 p-5">
          <p className="text-white text-m block uppercase tracking-wide font-bold">
            Kullanıcı Kaydı Sayfası
          </p>
        </h1>
      </div>

      <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-6 pb-4">
            <div className="flex p-2 w-full ">
              <label className="block w-80 uppercase tracking-wide text-sm font-bold text-gray-700 mt-2">
                PROFİL FOTOĞRAFI:
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
                  htmlFor="grid-first-name"
                >
                  İSİM:
                </label>

                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="firstName"
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
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  SOYİSİM:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  name="lastName"
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
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-username"
                >
                  KULLANICI ADI:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-username"
                  type="text"
                  name="username"
                  {...register("username", {
                    required: "Kullanıcı adı zorunludur.",
                    maxLength: {
                      value: 20,
                      message: "kullanıcı adı maksimum 20 karakter olmalıdır.",
                    },
                  })}
                  aria-invalid={errors.username ? "true" : "false"}
                />

                {errors.username && (
                  <p className="text-red-500 text-xs italic mt-1" role="alert">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-age"
                >
                  ŞİFRE:
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  id="grid-age"
                  type="text"
                  name="age"
                  {...register("password", {
                    required: "Şifre zorunludur",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-phone"
                >
                  TELEFON NUMARASI:
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  id="grid-phone"
                  type="tel"
                  name="phone"
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



              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-username"
                >
                  EMAIL:
                </label>

                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  id="grid-email"
                  type="text"
                  name="email"
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
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-address"
                >
                  EV ADRES:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-address"
                  type="text"
                  name="address.address"
                  {...register("address.address", {
                    required: "Adres zorunludur.",
                  })}
                  aria-invalid={errors.address.address ? "true" : "false"}
                />

                {errors.address.address && (
                  <p className="text-red-500 text-xs italic mt-1" role="alert">
                    {errors.address.address.message}
                  </p>
                )}
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  ŞEHİR:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  name="address.city"
                  {...register("address.city", {
                    required: "Şehir zorunludur.",
                  })}
                  aria-invalid={errors.address.city ? "true" : "false"}
                />

                {errors.address.city && (
                  <p className="text-red-500 text-xs italic mt-1" role="alert">
                    {errors.address.city.message}
                  </p>
                )}
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-company-name"
                >
                  İŞ (FİRMA) ADI:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-company-name"
                  type="text"
                  name="company.name"
                  {...register("company.name")} 
                  />
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-company-address"
                >
                  İŞ ADRES:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-company-address"
                  type="text"
                  name="company.address"
                  {...register("company.address")} 
                  />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-2">
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-company-city"
                >
                  İS ADRES ŞEHİR:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-company-city"
                  type="text"
                  name="company.city"
                  {...register("company.city")}
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
