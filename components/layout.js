import Head from "next/head";
import Link from "next/link";
export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta name="description" content="Brandon's Climbing Adventures" />

        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="bg-amber-700 flex flex-wrap">
        <div className="text-3xl text-zinc-300 mx-4 my-3 font-bold">
          <Link href="/"> Brandon&apos;s Climbing Adventures</Link>
        </div>
        <Link href="/about">
          <div className="text-2xl text-zinc-300 px-4 py-3 hover:text-zinc-100 hover:bg-amber-800">
            About
          </div>
        </Link>
        <Link href="/locations">
          <div className="text-2xl text-zinc-300 px-4 py-3 hover:text-zinc-100 hover:bg-amber-800">
            <a>View Gyms</a>
          </div>
        </Link>
      </div>

      <main className="min-h-screen">{children}</main>

      <footer className="text-center bg-gray-900">Made with Next.js</footer>
    </div>
  );
}
