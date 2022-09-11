import { useState } from "react";
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

export default function SignIn({ csrfToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: "http://localhost:3000",
    });

    if (result?.error) {
      setError(result?.error);
    } else {
      router.push(result.url);
    }
  };

  return (
    <Layout>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col col-xl-8 mt-4 mb-4">
          <form onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-4 d-none d-md-block">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form"
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-6 align-items-center">
                <div className="text-center mt-3">
                  <h5 className="fw-bold pb-3">Sign In</h5>
                </div>
                <div className="row">
                  <div className="col-12 mb-2">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      className="form-control"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-2">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      className="form-control"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12  mb-2 text-center">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Login
                    </button>
                  </div>
                </div>
                {error && <div className="error">{error}</div>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { csrfToken } };
}
