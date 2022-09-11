import Layout from "@/components/layout";
import UsersComponent from "@/components/users/usersComponent";

export default function Home({ data }) {
  return (
    <Layout>
      <UsersComponent data={data} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/student`);
  const data = await res.json();

  return { props: { data: data.data } };
}
