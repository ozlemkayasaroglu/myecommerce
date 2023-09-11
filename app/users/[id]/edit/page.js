"use client";
import { useEffect, useState } from "react";
import UserData from "@/components/UserData";




export default function Edit({ params }) {
  const userId = params.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/users?id=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Verileri güncellerken bir hata oluştu.');
      }
  
      console.log('Veriler başarıyla güncellendi');
    } catch (error) {
      console.error(error.message);
    }
  };

  const [userData, setUserData] = useState({
    id: '',
    image: '',
    firstName: '',
    lastName:'',
    userName:'',
    phone: '',
    age:'',
    email:'',
    address: {
      address: '',
      city:'',
    },
    company: {
      address: {
        address: '',
        city: '',
      },
    },

  });

  
  
const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name in userData) {
    setUserData({
      ...userData,
      [name]: value,
    });
  } else {
    
    const [parent, child] = name.split('.');
    setUserData({
      ...userData,
      [parent]: {
        ...userData[parent],
        [child]: value,
      },
    });
  }
  console.log(userData);
};
 

  useEffect(() => {
    async function fetchData() {
      const data = await UserData(params.id)
      setUserData(data[0])
    }
    fetchData()
  }, [userId]);

  
  

  return (
    <div>
      <h1>Kullanıcı Düzenleme Sayfası</h1>
      {userData ?
      <form>
        <label>Kullanıcı Id </label>
        <input  onChange={handleInputChange} value={userData.id}></input><br />

        <label>Profil Fotoğrafı:</label>
        <img src={userData.image} alt="Profil Fotoğrafı" /><br />

        <label>First Name: </label>
        <input  onChange={handleInputChange}  value={userData.firstName}></input>
        <br />
        <label>Last Name: </label>
        <input  onChange={handleInputChange} value={userData.lastName}></input>
        <br />
        <label>Kullanıcı Adı: </label>
        <input  onChange={handleInputChange} value={userData.username}></input>
        <br />
        <label>Telefon Numarası: </label>
        <input onChange={handleInputChange} value={userData.phone}></input>
        <br />
        <label>Age: </label>
        <input  onChange={handleInputChange} value={userData.age}></input>
        <br />
        <label>Email </label>
        <input  onChange={handleInputChange} value={userData.email}></input>
        <br />
        <label>Adres: </label>
        <input  onChange={handleInputChange} value={userData.address.address + " /"}></input>
        <br />
        <label>İş Adres: </label>
        <input  onChange={handleInputChange} value={userData.company.address.address + " /"}></input>
        <br />
        <button onClick={handleSubmit}>Güncelle</button>
      </form>
    :
      <div>Loading</div>
    }
    </div>
  );
}
