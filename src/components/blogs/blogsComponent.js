import React from "react";

export default function blogsComponent({ data }) {
  return (
    <div className="row row-cols-1 row-cols-md-4 g-2 my-2">
      {data.map((post, index) => {
        return (
          <div key={index} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">${post.title}</h5>
                <p className="card-text">${post.body}</p>
                <a href="#" className="btn btn-primary btn-sm">
                  Read More
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
