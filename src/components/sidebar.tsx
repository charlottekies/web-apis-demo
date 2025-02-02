import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Link from "next/link";
import { useRef } from "react";

const Sidebar = ({ close }: { close: () => void }) => {
  const sidebarRef = useRef<HTMLDivElement|null>(null);

  useOnClickOutside(sidebarRef, close);

  return (
    <div ref={sidebarRef} className="border border-solid h-full space-y-6">
      <h2 className="text-xl font-bold">Navigation</h2>
      <ul className="space-y-4">
        <li><Link onClick={close} href="/rest-books">REST Books</Link></li>
        <li><Link onClick={close} href="/rest-authors">REST Authors</Link></li>
        <li><Link onClick={close} href="/graphql-books">GraphQL Books</Link></li>
        <li><Link onClick={close} href="/graphql-authors">GraphQL Authors</Link></li>
        <li><Link onClick={close} href="/trpc-books">tRPC Books</Link></li>
        <li><Link onClick={close} href="/trpc-authors">tRPC Authors</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
