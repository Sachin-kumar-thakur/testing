import Link from "next/link";
import Image from "next/image";

const Logo = ({ src, height, width }) => {
  return (
    <Link href="/">
      <a className="navbar-brand">
        <Image src={src} alt="logo" width={width} height={height} />
      </a>
    </Link>
  );
};

export default Logo;
