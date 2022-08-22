import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithGoogle } from "/pages/api/firebaseAccess";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Layout from "/components/layout";
import bgstyles from "/styles/granimBackground.module.css";

const auth = getAuth();

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/contentManager");
      }
    });
  }, [router]);
  return (
    <Layout>
      <Head>
        <title>Login to CMS</title>
      </Head>
      <div>
        <canvas className={bgstyles.canvasBasic} id="canvas-basic"></canvas>
        <div className="text-zinc-200 p-10 text-center content-center">
          <h1 className="text-4xl text-zinc-100 mb-2">
            Login to Content Management System
          </h1>

          <button
            onClick={signInWithGoogle}
            className="bg-blue-600 p-2 border-2 rounded-lg mb-2 hover:bg-blue-800"
          >
            Login With Google
          </button>

          <h2>
            <Link href="/">
              <a>- Back to Home -</a>
            </Link>
          </h2>
        </div>
      </div>
    </Layout>
  );
}
