import Link from "next/link";

const Sidebar = () => {
  return (
    <div className=" space-y-6">
      <h2 className="text-xl font-bold">Navigation</h2>
      <ul className="space-y-4">
        <li><Link href="/rest-books">REST Books</Link></li>
        <li><Link href="/rest-authors">REST Authors</Link></li>
        <li><Link href="/graphql-books">GraphQL Books</Link></li>
        <li><Link href="/graphql-authors">GraphQL Authors</Link></li>
        <li><Link href="/trpc-books">tRPC Books</Link></li>
        <li><Link href="/trpc-authors">tRPC Authors</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
