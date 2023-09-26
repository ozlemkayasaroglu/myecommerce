import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div>
        <a> My E-commerce</a>
      </div>

      <div>
        <ul>
          <li>
            <Link href="/">Ana Sayfa</Link>
          </li>
          <li>
            <Link href="/users">Kullanıcılar</Link>
          </li>
          <li>
            <Link href="/products">Ürün Listesi</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
