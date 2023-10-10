
import ShowProductList from "@/components/ShowProductList";
import Link from "next/link";
import React from "react";




const HomePage = () => {
  return (
    <>
      <div className="flex space-x-4 ml-auto bg-amber-400">
        <Link href="/users" className="bg-amber-300">
          <ul className="space-x-4 ml-auto bg-amber-400 hover:bg-amber-300 p-5">
            <li className="text-white text-m ps-5 uppercase  tracking-wide font-bold">Kullanıcılar</li>
          </ul>
        </Link>

        <Link href="/products" className="bg-amber-400">
          <ul className="space-x-4 ml-auto bg-amber-400 hover:bg-amber-300 p-5">
            <li className="text-white text-5 uppercase  tracking-wide font-bold">Ürünler</li>
          </ul>
        </Link>
      </div>

      <ShowProductList />
    </>
  );
};

export default HomePage;
