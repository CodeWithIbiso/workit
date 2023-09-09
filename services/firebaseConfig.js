import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import constants from "expo-constants";

const env_variables = constants.manifest.extra;

const firebaseConfig = {
  apiKey: env_variables.apiKey.slice(0, 39),
  authDomain: env_variables.authDomain,
  projectId: env_variables.projectId,
  storageBucket: env_variables.storageBucket,
  messagingSenderId: env_variables.messagingSenderId,
  appId: env_variables.appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore();
