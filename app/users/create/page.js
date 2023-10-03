"use client";
import { useState } from "react";

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

    if (name === "phone" || name === "age") {
      if (!/^[0-9]+$/.test(value)) {
        alert(`Lütfen sadece numaralardan oluşan bir değer girin.`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      console.log("Kullanıcı başarıyla kaydedildi.");
    } catch (error) {
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
        <form className="flex items-center space-x-6 pb-4">
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
            onClick={handleSubmit}
            className="px-8 py-3 text-sm font-semibold text-white bg-amber-300 hover:bg-amber-300 rounded-md rounded-md "
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
                value={createUser.firstName}
                onChange={handleChange}
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
                onChange={handleChange}
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
                value={createUser.username}
                onChange={handleChange}
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
                type="text"
                name="phone"
                value={createUser.phone}
                onChange={handleChange}
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
                type="text"
                name="age"
                value={createUser.age}
                onChange={handleChange}
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
                value={createUser.email}
                onChange={handleChange}
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
                value={createUser.address.address}
                onChange={handleChange}
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
                value={createUser.address.city}
                onChange={handleChange}
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
                value={createUser.company.name}
                onChange={handleChange}
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
                value={createUser.company.address}
                onChange={handleChange}
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
                value={createUser.company.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <button
              className="px-5 py-3 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
              type="button"
              onClick={handleSubmit}
            >
              Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
