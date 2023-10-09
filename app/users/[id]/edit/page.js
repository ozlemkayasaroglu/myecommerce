"use client";
import { useEffect, useState } from "react";
import UserData from "@/components/UserData";

export default function EditUser({ params }) {
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    address: "",
    city: "",
  });

  const [company, setCompany] = useState({
    address: "",
    city: "",
    name: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await UserData(params.id);
      setId(data[0].id);
      setImage(data[0].image);
      setFirstName(data[0].firstName);
      setLastName(data[0].lastName);
      setUsername(data[0].username);
      setPhone(data[0].phone);
      setAge(data[0].age);
      setEmail(data[0].email);
      setAddress(data[0].address);
      setCompany(data[0].company);
    }
    fetchData();
  }, [id]);

  const handleClickUpdate = async (e) => {
    e.preventDefault();
    try {
      const dataToUpdate = {
        image: image,
        firstName: firstName,
        lastName: lastName,
        username: username,
        phone: phone,
        age: age,
        email: email,
        address: {
          address: address,
          city: city,
        },
        company: {
          address: address,
          city: city,
          name: name,
        },
      };

      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (!response.ok) {
        throw new Error("Verileri güncellerken bir hata oluştu.");
      }
      const updatedData = await response.json();
      console.log("Veriler başarıyla güncellendi:", updatedData);
    } catch (error) {
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
      {firstName ? (
        <form>
          <div className="my-4 flex items-center space-x-4 ">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img
                  className="w-full h-full object-cover "
                  src={image}
                  alt="Profil fotoğrafı"
                />
              </div>
            </div>

            <div className="flex flex-col pl-3">
              <label className="text-gray-700 text-sm font-bold mb-2">
                Profil Fotoğrafı:
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
          <div className="flex w-full pl-3">
            <div className="m-4 w-1/2">
              <label className="block text-gray-700 text-sm font-bold">
                First Name:{" "}
              </label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-full"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <br />
            </div>

            <div className="m-4 w-1/2">
              <label className="block text-gray-700 text-sm font-bold">
                Last Name:{" "}
              </label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-full"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <br />
            </div>
          </div>

          <label>Kullanıcı Adı: </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <br />
          <label>Telefon Numarası: </label>
          <input onChange={(e) => setPhone(e.target.value)} value={phone} />
          <br />
          <label>Yaş: </label>
          <input onChange={(e) => setAge(e.target.value)} value={age} />
          <br />
          <label>Email </label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} />
          <br />
          <h2>Adres-1 </h2>
          <label>Mahalle-Sokak: </label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address.address}
          />
          <br />

          <label>Şehir: </label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address.city}
          />
          <br />

          <h2>Adres-2</h2>
          <label>Şirket Adı: </label>
          <input
            onChange={(e) => setCompany(e.target.value)}
            value={company.name}
          />
          <br />
          <label>Mahalle-Sokak: </label>
          <input
            onChange={(e) => setCompany(e.target.value)}
            value={company.address}
          />
          <br />
          <label>Şehir: </label>
          <input
            onChange={(e) => setCompany(e.target.value)}
            value={company.city}
          />
          <br />

          <button onClick={handleClickUpdate}>Güncelle</button>
        </form>
      ) : (
        <div>Kullanıcı Düzenleme Sayfası Yükleniyor...</div>
      )}
    </div>
  );
}
