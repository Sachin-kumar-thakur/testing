import Logo from "@/components/logo";
import Menu from "@/components/layout/header/menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Logo src="/images/logo.svg" width="48" height="32" />
        <div className="d-flex flex-wrap align-items-center justify-content-between ">
          <Menu />
        </div>
        {session ? (
          <div className="d-flex flex-wrap align-items-center justify-content-between ms-auto ">
            <p className="mb-0 me-2 text-light">{session.user.name}</p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="d-flex flex-wrap align-items-center justify-content-between ms-auto ">
            <Link href="/auth/signup">
              <a className="btn btn-info btn-sm me-2">Register</a>
            </Link>
            <Link href="/auth/signin">
              <a className="btn btn-info btn-sm">Sign In</a>
            </Link>
          </div>
        )}
        <div className="d-lg-none">
          <button className="btn btn-primary">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
