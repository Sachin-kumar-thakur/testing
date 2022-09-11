import Layout from "@/components/layout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getSession } from "next-auth/react";

export default function SignUp() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onChange = (e) => setProfilePhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);

    fd.append("photo", profilePhoto);

    try {
      const response = await fetch(`${process.env.API_URL}/auth/signup`, {
        method: "POST",
        body: fd,
      });
      const json = await response.json();

      if (response.status > 400) {
        throw new Error(json.error);
      } else {
        router.push("/auth/signin");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-12">
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: 8, marginBottom: 16 }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <img
                  src={
                    profilePhoto
                      ? URL.createObjectURL(profilePhoto)
                      : "/images/profile.svg"
                  }
                  className="rounded mb-3"
                  width="200"
                  height="200"
                  objectfit="cover"
                  alt="profile"
                />

                <input
                  type="file"
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="col-lg-6 align-items-center">
                {error && <div className="error">{error}</div>}
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <label htmlFor="name" className="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="User Name"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="check"
                        id="gridCheck"
                        onChange={() => console.log("checked")}
                      />
                      <label className="form-check-label" htmlFor="gridCheck">
                        Agree with our terms and conditions !
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary mt-4 mb-4">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
