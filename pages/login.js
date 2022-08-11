import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "./about.module.css";
import Granim from "granim";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signInWithGoogle } from "/pages/api/firebase_access";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default function Login() {
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.replace("/contentmanager");
    }
  });
  useEffect(() => {
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
  //https://cdnjs.cloudflare.com/ajax/libs/granim/2.0.0/granim.min.js
  return (
    <Layout>
      <Head>
        <title>About Brandon</title>
      </Head>
      <div>
        <canvas className={styles.canvasBasic} id="canvas-basic"></canvas>
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
