export default async function UserData(id) {
    const res = await fetch(
       `http://localhost:3001/users/${id}`
      );
  
   if (!res.ok) {
     throw new Error('Failed to fetch data')
   }
   const userData = await res.json()
   return userData;
}
