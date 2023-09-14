"use client";
import { useEffect, useState } from "react";

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
    <div>
    <h1>Kullanıcı Listesi</h1>

    {loading ? (
      <p>Veriler yükleniyor...</p>
    ) : (
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
              <td>{user.firstName} {user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}