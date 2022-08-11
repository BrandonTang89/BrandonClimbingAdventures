import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";
export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta name="description" content="Brandon's Climbing Adventures" />
      </Head>
      <div className="bg-amber-700 flex flex-row">
        <div className="text-3xl text-zinc-300 mx-4 my-3 font-bold">
          <Link href="/"> Brandon&apos;s Climbing Adventures</Link>
        </div>
        <Link href="/about">
          <div
            className="text-2xl text-zinc-300 px-4 py-3 hover:text-zinc-100 hover:bg-amber-800"
          >
            About
          </div>
        </Link>
        <Link href="/locations">
          <div
            className="text-2xl text-zinc-300 px-4 py-3 hover:text-zinc-100 hover:bg-amber-800"
          >
            <a>View Gyms</a>
          </div>
        </Link>
      </div>

      <main className="min-h-screen">{children}</main>

      <footer className="text-center bg-gray-900">Made with Next.js</footer>
    </div>
  );
}
