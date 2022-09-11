import Layout from "@/components/layout";
import BlogsComponent from "@/components/blogs/blogsComponent";

export default function BlogsPage({ data }) {
  return (
    <Layout>
      <BlogsComponent data={data} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  console.log(data);

  return { props: { data } };
}
