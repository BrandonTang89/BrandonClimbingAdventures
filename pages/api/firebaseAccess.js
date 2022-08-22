import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  getFirestore,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB67TlOgtp4wZGpD-N7f6D4MftUlIDz1zo",
  authDomain: "climbing-adventures.firebaseapp.com",
  projectId: "climbing-adventures",
  storageBucket: "climbing-adventures.appspot.com",
  messagingSenderId: "897774958529",
  appId: "1:897774958529:web:f0fbd0ee103d36226ba140",
};

const app = initializeApp(firebaseConfig);

// Auth Functions
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
const logout = () => {
  signOut(auth);
};
export { signInWithGoogle, logout };
// Initialize Firebase
const db = getFirestore(app);

export const getLocations = async () => {
  const querySnapshot = await getDocs(query(collection(db, "Locations")));
  let location_list = [];
  querySnapshot.forEach((doc) => {
    // console.log("doc: ", doc.data().Position);
    location_list.push({
      id: doc.id,
      name: doc.data().Name,
      position: [doc.data().Position.latitude, doc.data().Position.longitude],
    });
  });

  return location_list;
};

export const getUserClimbs = async () => {
  var user = auth.currentUser;
  if (!user) {
    user = {
      email: "tangyuhanbrandon@gmail.com"
    }
  }
  const querySnapshot = await getDocs(
    query(collection(db, "UserClimbs"), where("email", "==", user.email))
  );
  var doclist = [];
  querySnapshot.forEach((doc) => doclist.push(doc));

  var climblist = [];
  await Promise.all(
    doclist.map(async (doc) => {
      // console.log("doc: ", doc.id);
      const climbsSnapShot = await getDocs(
        collection(db, "UserClimbs/" + doc.id + "/Climbs")
      );
      climbsSnapShot.forEach((climb) => {
        // console.log("climb: ", climb.data());
        // console.log("date: ", climb.data().date.toDate().toString());
        climblist.push({
          id: climb.id,
          location: climb.data().location,
          grade: climb.data().grade,
          date: climb.data().date.toDate().toString(),
          yturl: climb.data().yturl,
          type: climb.data().type,
        });
      });
    })
  );

  // console.log("climblist: ", climblist);

  return climblist;
};


export const addClimb = async (climb) => {
  console.log("climb: ", climb);
  var user = auth.currentUser;
  const querySnapshot = await getDocs(
    query(collection(db, "UserClimbs"), where("email", "==", user.email))
  );
  var doclist = [];
  querySnapshot.forEach((doc) => doclist.push(doc));
  var doc = doclist[0];
  console.log("doc: ", doc);
  await addDoc(collection(db, "UserClimbs/" + doc.id + "/Climbs"), {
    location: climb.location,
    grade: climb.grade,
    date: climb.date,
    yturl: climb.yturl,
    type: climb.type,
  });
  return true;
}

export const deleteClimb = async (climbid) => {
  console.log("climbid: ", climbid);
  var user = auth.currentUser;
  const querySnapshot = await getDocs(
    collection(db, "UserClimbs"),
    where("email", "==", user.email)
  );
  var doclist = [];
  querySnapshot.forEach((docu) => doclist.push(docu));
  var docu = doclist[0];
  console.log("doc: ", docu);
  console.log(typeof "UserClimbs/" + docu.id + "/Climbs")
  console.log(typeof climbid)

  await deleteDoc(doc(collection(db, "UserClimbs/" + docu.id + "/Climbs"), (climbid)));
  return true;
}
