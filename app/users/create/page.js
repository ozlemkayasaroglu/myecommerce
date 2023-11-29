"use client";
import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useForm} from "react-hook-form";

const MySwal = withReactContent(Swal);


export default function CreateUser() {
  const [createUser, setCreateUser] = useState({
    id: "",
    image: "",
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    age: "",
    email: "",
    address: {
      address: "",
      city: "",
    },
    company: {
      address: "",
      city: "",
      name: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "phone" || name == "age") {
      if (!/^[0-9]+$/.test(value)) {
        Swal.fire({
          icon: 'error',
          title: 'Hata!',
          text: 'Sadece sayı giriniz.',
        });
        return;
      }
      
    }

    setCreateUser((prevCreateUser) => {
      if (name.startsWith("address.")) {
        const addressName = name.split(".")[1];
        return {
          ...prevCreateUser,
          address: {
            ...prevCreateUser.address,
            [addressName]: value,
          },
        };
      } else if (name.startsWith("company.")) {
        const companyName = name.split(".")[1];
        return {
          ...prevCreateUser,
          company: {
            ...prevCreateUser.company,
            [companyName]: value,
          },
        };
      } else {
        return {
          ...prevCreateUser,
          [name]: value,
        };
      }
    });
  };


  const {register, handleSubmit, formState: {error}} = useForm();

  const onSubmit = async (data) => {
  console.log(data);

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUser),
      });

      if (!response.ok) {
        throw new Error("Kullanıcı kaydı sırasında bir hata oluştu.");
      }
      MySwal.fire({
        icon: 'success',
        title: 'Ürün başarıyla kaydedildi!',
        text: 'Ürün başarıyla kaydedildi.',
      });


      console.log("Kullanıcı başarıyla kaydedildi.");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Ürün kaydı başarısız.',
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-6 pb-4">
          <div className="flex p-2 w-full ">
            <label className="block w-80 uppercase tracking-wide text-sm font-bold text-gray-700 mt-2">
              PROFİL FOTOĞRAFI:
            </label>
            
              <input
                className="appearance-none block w-full bg-white text-gray-700 rounded py-3 px-4"
                placeholder=" Dosya linki eklenmedi"
              ></input>
           
          </div>
          <button
    
            className="px-8 py-3 text-sm font-semibold text-white bg-amber-300 hover:bg-amber-300 rounded-md rounded-md " type="submit"
          >
            Yükle
          </button>
        </form>

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
                defaultValue={createUser.firstName}
                {...register("firtsName")}
              />
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
                value={createUser.lastName}
                {...register("lastName")}
              />
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-full px-3">
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
                defaultValue={createUser.username}
                {...register("username")}
              />
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-phone"
                type="number"
                name="phone"
                defaultValue={createUser.phone}
{...register("phone")}
              />
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-age"
              >
                YAŞ:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-age"
                type="number"
                name="age"
                defaultValue={createUser.age}
                {...register("age")}
              />
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                EMAIL:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="text"
                name="email"
                defaultValue={createUser.email}
                {...register ("email")}
              />
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
                defaultValue={createUser.address.address}
                {...register("address")}
              />
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
                defaultValue={createUser.address.city}
                {...register("city")}
              />
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
                defaultValue={createUser.company.name}
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
                defaultValue={createUser.company.address}
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
                defaultValue={createUser.company.city}
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
      </div>
    </div>
  );
}
