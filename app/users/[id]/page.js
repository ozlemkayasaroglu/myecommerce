"use client";
import { useEffect, useState } from "react";
import UserData from "@/components/UserData";
import Link from "next/link";

export default function ShowUser({ params }) {
  const [users, setUsers] = useState([]);
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
      setUsers(data[0]);
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
  }, []);

  const handleClickDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    });

  

    if (!response.ok) {
      throw new Error("Verileri güncellerken bir hata oluştu.");
    }
    const deletedUser = await response.json();
    console.log("Veriler başarıyla güncellendi:", deletedUser);
  };

  return (
    <div>
      <h1>Kullanıcı Görüntüleme Sayfası</h1>
      <></>
      {id ? (
      <>
          <div>
            <img src={image} alt="Profil Fotoğrafı" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Kullanıcı ID</th>
                <th>{id}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>İsim</td>
                <td>{firstName}</td>
              </tr>
              <tr>
                <td>Soyisim</td>
                <td>{lastName}</td>
              </tr>
              <tr>
                <td>Kullanıcı Adı:</td>
                <td>{username}</td>
              </tr>
              <tr>
                <td>Telefon Numarası:</td>
                <td>{phone}</td>
              </tr>
              <tr>
                <td>Yaş: </td>
                <td>{age}</td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Adres</td>
                <td>{address.address} / {address.city}</td>
              </tr>
            </tbody>
            <tfoot>
            <tr>
                <td>Şirket/ Firma Adı:</td>
                <td>{company.name} </td>
              </tr>
              <tr>
                <td>İş Adresi:</td>
                <td>{company.address} / {company.city}</td>
              </tr>
            </tfoot>
          </table>
          
        <button>  <Link href={`/users/${id}/edit`}> Düzenle</Link></button>
        <button onClick={handleClickDelete}>Sil</button>
        </>
         
      ) : (
        <div>Kullanıcı Görüntüleme Sayfası Yükleniyor...</div>
      )}
    </div>
  );
}
