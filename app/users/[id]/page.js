"use client";
import { useEffect, useState } from "react";
import UserData from "@/components/UserData";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ShowUser({ params }) {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
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
      console.log(data);
      setUsers(data.users);
      setId(data.id);
      setImage(data.image);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setUsername(data.username);
      setPhone(data.phone);
      setEmail(data.email);
      setAddress({
        address: data.address.address,
        city: data.address.city,
      });
      setCompany({
        address: data.company.address,
        city: data.company.city,
        name: data.company.name,
      });
    }
    fetchData();
  }, [id]);

  const handleClickDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/user/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Kullanıcı silme işlemi başarısız.",
      });
      throw new Error("Verileri güncellerken bir hata oluştu.");
    }
    const deletedUser = await response.json();

    MySwal.fire({
      icon: "success",
      title: "Kullanıcı silindi!",
      text: "Kullanıcı başarıyla silindi.",
    });

    console.log("Veriler başarıyla güncellendi:", deletedUser);
  };

  return (
    <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
      <div className="flex space-x-4 bg-amber-400 ">
        <h1 className="space-x-4 bg-amber-400 hover:bg-amber-300 p-5">
          <p className="text-white text-m block uppercase tracking-wide font-bold">
            Kullanıcı Görüntüleme Sayfası
          </p>
        </h1>
      </div>
      <></>
      {id ? (
        <>
          <div className="flex">
            <Image
              className="border rounded-md bg-white m-4 w-1/3"
              src={image}
              width={300}
              height={300}
              alt="Ürün Fotoğrafı"
            ></Image>
            <div className="border rounded-md bg-white m-4 w-2/3 ">
              <div className="flex flex-col mt-12 items-center justify-center">
                <h2 className="text-2xl text-gray-600 font-semibold  item-center">
                  {firstName} {lastName}
                </h2>

                <div className="mt-auto mb-3">
                  <span className="text-gray-400 text-xl ">{email}</span>
                </div>
                <div className="text-xl mt-1">
                  <span className="text-amber-400 text-md ">{phone}</span>
                </div>
                <div className="text-xl mt-4">
                  <span className="text-gray-400 text-md ">{username}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="m-4">
            <div className="p-5 border rounded-md bg-white w-full mx-auto">
              <span className="text-gray-500">
                <h3 className="text-gray-600 text-m block uppercase tracking-wide font-semibold p-1">
                  Ev Adresi:{" "}
                </h3>
                {address.address}/{address.city}
              </span>
            </div>
          </div>
          <div className="m-4">
            <div className="p-5 border rounded-md bg-white w-full mx-auto">
              <span className="text-gray-500">
                <h3 className="text-gray-600 text-m block uppercase tracking-wide font-semibold p-1">
                  İş Adresi:{" "}
                </h3>
                {company.address}/{company.city}
              </span>
            </div>
          </div>
          <div className="m-4 flex">
            <div className="justify-between items-center mx-auto pr-6">
              <button
                className="bg-green-800 hover:bg-green-700 rounded-md py-2 mr-2 px-4 text-white"
                type="button"
              >
                <Link href={`/users/${id}/edit`}> Düzenle</Link>
              </button>

              <button
                className="bg-rose-800 hover:bg-rose-700 rounded-md py-2 px-4 text-white"
                type="button"
                onClick={handleClickDelete}
              >
                Sil
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>Kullanıcı Görüntüleme Sayfası Yükleniyor...</div>
      )}
    </div>
  );
}
