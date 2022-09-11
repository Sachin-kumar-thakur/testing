import React from "react";
import Link from "next/link";

export default function usersComponent({ data }) {
  return (
    <div className="row row-cols-1 row-cols-md-4 g-2 my-2">
      {data.map((user, index) => {
        return (
          <div key={index} className="col">
            <div className="card">
              <img
                src={user.photo ? user.photo : "/images/profile.svg"}
                className="card-img-top"
                alt={user.firstName}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {user.firstName} {user.lastName}
                </h5>
                <p className="card-text">{user.email}</p>
                <Link href={`/user/edit/${user.id}`}>
                  <a className="btn btn-primary btn-sm">Edit</a>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
