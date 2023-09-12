"use client";
import { useEffect, useState } from "react";
import UserData from "@/components/UserData";

export default function Edit({ params }) {
  
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
    name: "",
    address: {
      address: "",
      city: "",
    },
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
        address: address,
        company: company,
      };

      const response = await fetch(
        `http://localhost:3001/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

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
    <div>
      <h1>Kullanıcı Düzenleme Sayfası</h1>
      {firstName ? (
        <form>
          <img
            onChange={(e) => setImage(e.target.value)}
            src={image}
            alt="Profil Fotoğrafı"
          />
          <br />
          <label>Kullanıcı Id </label>
          <input value={id} />
          <br />
          <label>First Name: </label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <br />
          <label>Last Name: </label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <br />
          <label>Kullanıcı Adı: </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <br />
          <label>Telefon Numarası: </label>
          <input onChange={(e) => setPhone(e.target.value)} value={phone} />
          <br />
          <label>Age: </label>
          <input onChange={(e) => setAge(e.target.value)} value={age} />
          <br />
          <label>Email </label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} />
          <br />
          <label>Adres: </label>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            value={address.address}
          />
          <br />
          <label>İş Adres: </label>
          <textarea
            onChange={(e) => setCompany(e.target.value)}
            value={company.address.address}
          />
          <br />
          <button onClick={handleClickUpdate}>Güncelle</button>
        </form>
      ) : (
        <div>Kullanıcı Listesi Yükleniyor... ... ...</div>
      )}
    </div>
  );
}
