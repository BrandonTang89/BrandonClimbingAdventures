import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "./about.module.css";
import Script from "next/script";
import Granim from "granim";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  getLocations,
  getUserClimbs,
  logout,
  addClimb,
  deleteClimb,
} from "/pages/api/firebase_access";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "react-datepicker/dist/react-datepicker.css";

const auth = getAuth();

export default function ContentManager({ locations, userClimbs }) {
  const router = useRouter();
  const [removeClimbId, setRemoveClimbId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newlocationid, setNewLocationId] = useState("");
  const [grade, setGrade] = useState("");
  const [type, setType] = useState("");
  const [yturl, setYturl] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace("/login");
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

  const uploadClimb = () => {
    if (newlocationid.length == 0) {
      alert("Please select a location");
      return;
    }
    if (grade.length == 0) {
      alert("Please enter a grade");
      return;
    }
    if (type.length == 0) {
      alert("Please enter a type");
      return;
    }
    if (yturl.length == 0) {
      alert("Please enter a youtube url");
      return;
    }

    console.log(newlocationid, grade, type, selectedDate, yturl);

    try {
      addClimb({
        location: newlocationid,
        grade: grade,
        type: type,
        date: selectedDate,
        yturl: yturl,
      });
      alert("Climb added");
    } catch (e) {
      alert("Error adding climb");
    }
  };
  const removeClimb = () => {
    if (removeClimbId == "") {
      alert("Please select a climb");
      return;
    }
    console.log(newlocationid, grade, type, selectedDate, yturl);

    try {
      deleteClimb(removeClimbId);
      alert("Climb removed");
    } catch (e) {
      alert("Error removing climb");
    }
  };
  //https://cdnjs.cloudflare.com/ajax/libs/granim/2.0.0/granim.min.js
  return (
    <Layout>
      <Head>
        <title>CMS</title>
      </Head>
      <div>
        <canvas className={styles.canvasBasic} id="canvas-basic"></canvas>
        <div className="text-zinc-200 p-10 text-center content-center">
          <h1 className="text-4xl text-zinc-100 mb-2">Content Manager</h1>
          <button
            onClick={logout}
            className="bg-red-600 p-2 border-2 rounded-lg mb-2 hover:bg-red-800"
          >
            Sign Out
          </button>
          <h1 className="text-3xl mb-2">Add Climb</h1>
          <form className="grid place-items-center">
            <select
              id="location"
              onChange={(e) => setNewLocationId(e.target.value)}
              className="max-w-md mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>
                Choose a Location
              </option>
              {locations.map((location) => {
                return <option key={location.id} value={location.name}>{location.name}</option>;
              })}
            </select>
            <select
              id="type"
              onChange={(e) => setType(e.target.value)}
              className="max-w-md mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>
                Type of Climb
              </option>
              <option value="Boulder">Boulder</option>
              <option value="Top Rope">Top Rope</option>
              <option value="Autobelay">Autobelay</option>
              <option value="Lead">Lead</option>
            </select>

            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Grade
              </label>
              <input
                type="text"
                id="gradeinput"
                onChange={(e) => setGrade(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Date
              </label>
              <DatePicker
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                selected={startDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>

            <label className=" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Youtube Video URL
            </label>
            <input
              type="text"
              id="yturlinput"
              onChange={(e) => setYturl(e.target.value)}
              className="max-w-md mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </form>
          <button
            onClick={uploadClimb}
            className="bg-green-600 p-2 border-2 rounded-lg mb-2 hover:bg-green-800"
          >
            Upload
          </button>

          <h1 className="text-3xl mb-2">Delete Climb</h1>

          <form className="grid place-items-center">
            <select
              id="removeClimbIdfield"
              onChange={(e) => setRemoveClimbId(e.target.value)}
              className="max-w-md mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {userClimbs.map((climb) => {
                return <option key={climb.id} value={climb.id}>{climb.id} - {climb.location} - {climb.grade} - {climb.type} - {climb.date}</option>;
              })}
            </select>
          </form>
          <button
            onClick={removeClimb}
            className="bg-zinc-600 p-2 border-2 rounded-lg mb-2 hover:bg-zinc-800"
          >
            Delete Climb
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

export async function getServerSideProps() {
  const locations = await getLocations();
  const userClimbs = await getUserClimbs();
  return {
    props: {
      locations,
      userClimbs,
    },
  };
}
