import React from "react";
import Link from "@/libs/activeLink";

const Menu = () => {
  return (
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link href="/users" activeClassName="active">
            <a className="nav-link">Students</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/products" activeClassName="active">
            <a className="nav-link">Products</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/blogs" activeClassName="active">
            <a className="nav-link">Blogs</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/user/create" activeClassName="active">
            <a className="nav-link">Create Student</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
