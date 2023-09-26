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
      name:"",
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
    <div>
      <h1>Kullanıcı Kaydı Sayfası</h1>
      <label >Profil Fotoğrafı: </label>
      <input
        placeholder="profil fotoğrafı yükle"
        type="text"
        name="image"
        value={createUser.image}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Yükle</button>
      <form>
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={createUser.firstName}
          onChange={handleChange}
        />
        <br />
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={createUser.lastName}
          onChange={handleChange}
        />
        <br />
        <label>Kullanıcı Adı: </label>
        <input
          type="text"
          name="username"
          value={createUser.username}
          onChange={handleChange}
        />
        <br />
        <label>Telefon Numarası: </label>
        <input
          type="text"
          name="phone"
          value={createUser.phone}
          onChange={handleChange}
        />
        <br />
        <label>Age: </label>
        <input
          type="text"
          name="age"
          value={createUser.age}
          onChange={handleChange}
        />
        <br />
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={createUser.email}
          onChange={handleChange}
        />
        <br />
        <label>Adres: </label>
        <textarea
          type="text"
          name="address.address"
          value={createUser.address.address}
          onChange={handleChange}
        />
        <label>Şehir: </label>
        <textarea
          type="text"
          name="address.city"
          value={createUser.address.city}
          onChange={handleChange}
        />
        <label>Şirket/ Firma Adı: </label>
        <textarea
          type="text"
          name="company.name"
          value={createUser.company.name}
          onChange={handleChange}
        />
        <label>Adres: </label>
        <textarea
          type="text"
          name="company.address"
          value={createUser.company.address}
          onChange={handleChange}
        />
        <label>Şehir: </label>
        <textarea
          type="text"
          name="company.city"
          value={createUser.company.city}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Gönder</button>
      </form>
    </div>
  );
}
