import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Brandon&apos;s Climbing Blog</title>
        <meta name="description" content="Brandon's Climbing Adventures" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Brandon&apos;s Climbing Blog!
        </h1>

        <p className={styles.description}>
          This is a simple blog about my climbs!
        </p>

        <div className={styles.grid}>
          <Link href="/about">
            <div className={styles.card}>
              <h2>About &rarr;</h2>
              <p>
                Learn about Brandon! From humble origins to uh nothing much
                still!
              </p>
            </div>
          </Link>

          <Link href="/locations">
            <a className={styles.card}>
              <h2>Explore by Location! &rarr;</h2>
              <p>Select a climbing gym and view Brandon&apos;s climbs!</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>Made with Next.js</footer>
    </div>
  );
}
