import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCdO9SAqqBjPgKtDN4hBe4IB3Epb5dUsa8",
  authDomain: "web-deploy-abc37.firebaseapp.com",
  projectId: "web-deploy-abc37",
  storageBucket: "web-deploy-abc37.appspot.com",
  messagingSenderId: "144606197023",
  appId: "1:144606197023:web:36c72c5afac989519bec2a",
  measurementId: "G-BHK7LK3CZR"
};


const app = initializeApp(firebaseConfig);

//export const auth = app.auth()
export const auth = getAuth(app);
export default app
