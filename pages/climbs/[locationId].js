import Granim from "granim";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import bgstyles from "/styles/granimBackground.module.css";
import Layout from "/components/layout";
import { getLocations, getUserClimbs } from "/pages/api/firebaseAccess";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  date = new Date(date);
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

export default function ClimbByLocation({ locations, userClimbs }) {
  const router = useRouter();
  const { locationId } = router.query;

  const [location_name, setLocationName] = useState("");
  const [climbs, setClimbs] = useState([]);
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

    locations.forEach((element) => {
      if (element.id == locationId) {
        setLocationName(element.name);
      }
    });
  }, []);

  useEffect(() => {
    var initClimbs = [];
    userClimbs.forEach((climb) => {
      if (climb.location == location_name) {
        climb = {
          date: Date.parse(climb.date),
          grade: climb.grade,
          location: climb.location,
          type: climb.type,
          yturl: climb.yturl,
        };
        initClimbs.push(climb);
      }
    });

    // sort climbs by date
    initClimbs.sort((a, b) => {
      return a.date - b.date;
    });
    setClimbs(initClimbs);
  }, [location_name]);

  //https://cdnjs.cloudflare.com/ajax/libs/granim/2.0.0/granim.min.js
  return (
    <Layout>
      <Head>
        <title>Climbs at {location_name}</title>
      </Head>
      <div>
        <canvas className={bgstyles.canvasBasic} id="canvas-basic"></canvas>
        <div className="text-zinc-200 mt-2 p-3 lg:p-10 text-center content-center">
          <h1 className="text-4xl text-zinc-100 mb-2">
            Brandon @ {location_name}
          </h1>

          <h2 className="text-3xl text-zinc-100 mb-2">
            Number of Climbs: {climbs.length}
          </h2>

          <div className="flex flex-wrap justify-center">
            {climbs.map((climb) => (
              <div className="w-full lg:w-1/4 p-2" key={climb.id}>
                <div className="bg-zinc-100 text-gray-700 shadow-lg rounded-lg p-1 lg:p-4">
                  <p>
                    Type: <b>{climb.type}</b>
                  </p>
                  <p>Date: {formatDate(climb.date)}</p>
                  <p>Grade: {climb.grade}</p>
                  <p>
                    URL:{" "}
                    <a
                      href={climb.yturl}
                      className="text-blue-800 hover:underline"
                    >
                      {climb.yturl}
                    </a>
                  </p>
                  <div className="w-full h-80 lg:h-[60vh]">
                    <iframe
                      width="100%"
                      height="100%"
                      src={climb.yturl
                        .replace("watch?v=", "embed/")
                        .replace("shorts/", "embed/")}
                        allow="fullscreen;"
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
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
