import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "./about.module.css";
import Granim from "granim";
import Script from "next/script";
import { getLocations, getUserClimbs } from "/pages/api/firebase_access";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Locations({ locations, userClimbs }) {
  const loadMap = () => {
    var container = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }
    var map = L.map("map").setView([1.3521, 103.8198], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    var climbsbylocation = {};
    userClimbs.forEach((climb) => {
      if (climb.location in climbsbylocation) {
        climbsbylocation[climb.location].push(climb);
      } else {
        climbsbylocation[climb.location] = [climb];
      }
    });

    locations.forEach((element) => {
      if (!(element.name in climbsbylocation)) {
        climbsbylocation[element.name] = [];
      }
      L.marker([element.position[0], element.position[1]])
        .addTo(map)
        .bindPopup(
          "<p>Gym Name: <b>" +
            element.name +
            " </b></p> <p>Number of Climbs: <b>" +
            climbsbylocation[element.name].length +
            "</b></p>" +
            " <a href='/climbs/" +
            element.id +
            "'>View Climbs</a>"
        );
    });
  };
  useEffect(() => {
    // Router.push('/locations');
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

    console.log("BACKGROUND LOADED");
    if (typeof L !== "undefined") {
      loadMap();
    }
  }, []);
  //https://cdnjs.cloudflare.com/ajax/libs/granim/2.0.0/granim.min.js
  return (
    <Layout>
      <Head>
        <title>View Climbing Locations</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"

        />
      </Head>
      <Script
        src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
        crossOrigin=""
        strategy="beforeInteractive"
        onLoad={() => {
          console.log(`Leaflet script loaded`);
          loadMap();
        }}
        onError={() => {
          console.log(`Leaflet script failed to load`);
        }}
      ></Script>
      <div>
        <canvas className={styles.canvasBasic} id="canvas-basic"></canvas>
        <div className="text-zinc-200 p-10 text-center content-center">
          <h1 className="text-4xl text-zinc-100 mb-2">
            View Climbing Locations
          </h1>
          <div className="text-2xl text-zinc-100 mb-2">
            Use scroll wheel to zoom and arrow keys to pan
          </div>

          <div id="map" className="h-[80vh]"></div>

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

export async function getServerSideProps() {
  var user = {
    email: "tangyuhanbrandon@gmail.com",
  };
  const locations = await getLocations();
  const userClimbs = await getUserClimbs(user);
  return {
    props: {
      locations,
      userClimbs,
    },
  };
}
