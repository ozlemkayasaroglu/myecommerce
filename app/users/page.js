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
            Kullanıcı Listesi
          </p>
        </h1>
      </div>
      {loading ? (
        <p>Veriler yükleniyor...</p>
      ) : (
      
        <>
          <div className="p-3">
            <button className="bg-purple-600 hover:bg-purple-500 rounded-lg w-48 h-12">
              <Link href={`/users/create`}>
                <p className="text-white p-2">Yeni Kullanıcı Ekle</p>
              </Link>
            </button>
          </div>
          <table className="min-w-full bg-gray-100 mb-4 mt-2 ml-1 mr-1">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  İSİM-SOYİSİM
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Kullanıcı Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  E-MAİL
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                      {user.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/users/${user.id}`}
                    >
                      <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full uppercase tracking-wide text-gray-800">
                        
                        {`${user.firstName} ${user.lastName}`}
                        </span>
                        </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  text-gray-500">
                      {user.username}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                      {user.email}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
        </>
      )}
    </div>
  );
}
