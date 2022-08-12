import { useEffect } from "react";
import Granim from "granim";
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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.replace("/contentManager");
    }
  });
  useEffect(() => {
    router.push('/login');
    var granimInstance = new Granim({
      element: "#canvas-basic",
      direction: "diagonal",
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ["#4e5713", "#57132c"],
            ["#574213", "#571b13"],
            ["#3e5713", "#134a57"],
          ],
        },
      },
    });
  }, []);
  return (
    <Layout>
      <Head>
        <title>About Brandon</title>
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
