"use client";
import { useState } from "react";


export default function CreateUser() {
  const [createUser, setCreateUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    userName: "",
    phone: "",
    age: "",
    email: "",
    address: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateUser((prevCreateUser) => ({
      ...prevCreateUser,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUser), // Kullanıcı verilerini JSON formatına çevirip gönderin
      });

      if (!response.ok) {
        throw new Error("Kullanıcı kaydı sırasında bir hata oluştu.");
      }

      // Başarı durumunda gerekli işlemleri yapabilirsiniz, örneğin yönlendirme yapabilirsiniz.
      console.log("Kullanıcı başarıyla kaydedildi.");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Kullanıcı Kaydı Sayfası</h1>
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
            name="userName"
            value={createUser.userName}
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
            name="address"
            value={createUser.address}
            onChange={handleChange}
          />
          <br />
          <label>İş Adres: </label>
          <textarea
            name="workAddress"
            value={createUser.workAddress}
            onChange={handleChange}
          />
          <br />
          <button onClick={handleSubmit}>Gönder</button>
        </form>
    </div>
  );
}
