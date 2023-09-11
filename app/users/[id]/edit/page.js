import { useState } from 'react';

export default function Edit({ params }) {
  const [data, setData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    // Diğer alanları da ekleyin
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };



export default async function Edit({ params }) {

  const responseData = await fetch(
    `http://localhost:3001/users?id=${params.id}`
  );
  const data = await responseData.json();

 
  const updateUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Güncelleme işlemi başarısız oldu.');
      }

      console.log('Kullanıcı başarıyla güncellendi.');
    } catch (error) {
      console.error('Hata:', error.message);
    }
  };

  

  return (
    <div>
      <h1>Kullanıcı Düzenleme Sayfası</h1>

      <form>
        <label>Kullanıcı Id </label>
        <input  onChange={handleInputChange} value={data[0].id}></input>
        <label>Profil Fotoğrafı:</label>
        <img src={data[0].image} alt="Profil Fotoğrafı" />

        <label>First Name: </label>
        <input  onChange={handleInputChange}  value={data[0].firstName}></input>
        <label>Last Name: </label>
        <input  onChange={handleInputChange} value={data[0].lastName}></input>
        <label>Kullanıcı Adı: </label>
        <input  onChange={handleInputChange} value={data[0].username}></input>
        <label>Telefon Numarası: </label>
        <input onChange={handleInputChange} value={data[0].phone}></input>
        <label>Age: </label>
        <input  onChange={handleInputChange} value={data[0].age}></input>
        <label>Email </label>
        <input  onChange={handleInputChange} value={data[0].email}></input>
        <label>Adres: </label>
        <input  onChange={handleInputChange} value={data[0].address.address + " /"}></input>
        <label>İş Adres: </label>
        <input  onChange={handleInputChange} value={data[0].company.address.address + " /"}></input>
        <button>Güncelle</button>
      </form>
    </div>
  );
}
