"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) {
          throw new Error("Veriler alınamadı");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-5 bg-slate-100 border-slate-300 rounded m-4">
      <div className="flex space-x-4 bg-amber-400 ">
        <h1 className="space-x-4 bg-amber-400 hover:bg-amber-300 p-5">
          <p className="text-white text-m block uppercase tracking-wide font-bold">
            Ürün Görüntüleme Sayfası
          </p>
        </h1>
      </div>
      {loading ? (
        <p>Veriler yükleniyor...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>İsim-Soyisim</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <Link
                      href={`/users/${user.id}`}
                    >{`${user.firstName} ${user.lastName}`}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button>
              {" "}
              <Link href={`/users/$[id]/create`}>Yeni Kullanıcı Ekle</Link>{" "}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
