

export default async function UserList() {
  const responseData = await fetch(` http://localhost:3001/users`);
  const data = await responseData.json();


  return (
    <div>
      <h1>Kullanıcı Listesi</h1>
      {data.map(item=> (
        <p>
        {item.id}- {item.firstName} {item.lastName} 
      </p>
      ))}
    </div>
  );
}
