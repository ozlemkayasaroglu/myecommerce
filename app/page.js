import Link from "next/link";
import React from "react";


const HomePage = () => {
  return (
    <div className="flex space-x-4 ml-auto bg-amber-300 py-5 ">
      <Link href="/users">
  <p className="text-white text-m ps-5">Kullanıcılar</p>
</Link>
<Link href="/products">
  <p className="text-white text-m">Ürünler</p>
</Link>
    </div>
  );
};

export default HomePage;
