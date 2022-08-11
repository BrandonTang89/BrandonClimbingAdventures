import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "./about.module.css";
import Granim from "granim";
import { useEffect } from "react";
export default function About() {
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
          <h1 className="text-4xl text-zinc-100 mb-2">About Brandon</h1>

          <Image
            src="/images/profile_pic.jpg"
            alt="[Brandon's Image]"
            height={400}
            width={300}
          />
          <div className="italic mb-1">
            Above: Brandon&apos;s attempt to be fashionable!
          </div>

          <div className="grid place-items-center">
            <div className="text-xl text-justify max-w-xl self-center mb-2">
              Brandon is a cool dude that has many hobbies, including:
              <ol className="list-decimal list-inside mb-2">
                <li>Climbing</li>
                <li>Competitive Programming</li>
                <li>Minecraft</li>
                <li>Bloon TD 6</li>
                <li>Spending 12398123 hours centering a &lt;div&gt;</li>
              </ol>
              <p className="mb-2">
                However, this website focuses on his <b>climbing adventures</b>.
              </p>
              <div className="text-2xl font-bold">Climbing History</div>
              <p className="mb-1">
                Brandon started climbing in early 2019, when he was in the first
                year of highschool. Initially starting at the Rock School at
                Tampines Hub, he enjoyed Top Rope, Autobelay and Bouldering. He
                also visited other gyms such as Climb Central Novena, Kallang
                and Funan, enjoying both the highwall and bouldering.
              </p>
              <p className="mb-1">
                However, as his friends were more into bouldering, he eventually
                move to focusing more on bouldering, doing that almost
                exclusively throughout 2020 and 2021. It is noted that Brandon
                didn&apos;t climb much during this time due to COVID-19, A-Levels and
                National Service...
              </p>
              <p>
                In the summer of 2022, Brandon was finally free to climb more
                and is now pursuring a mix of highwall and bouldering sessions.
              </p>
            </div>
          </div>

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
