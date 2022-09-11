import { getToken } from "next-auth/jwt";
import Layout from "@/components/layout";
import { getSession } from "next-auth/react";
import BlogsComponent from "@/components/blogs/blogsComponent";
import Link from "next/link";

export default function ProductsPage({ data }) {
  return (
    <Layout>
      {data === "unauthorized" ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: 320 }}
        >
          <h3 className="text-danger">
            You are not authorized to view this page
          </h3>

          <Link href="/auth/signin">
            <a className="btn btn-primary btn-sm">Login To View This Page</a>
          </Link>
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: 320 }}
        >
          <h3 className="text-success">{data}</h3>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  if (!session) {
    return { props: { data: "unauthorized" } };
  } else {
    const token = await getToken({
      req,
      secret: process.env.SECRET,
      raw: true,
    });
    const response = await fetch(`${process.env.API_URL}/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { props: { data: data.data } };
  }
}
