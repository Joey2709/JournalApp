import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { CreateUserI } from "../entities";
import { FirebaseAuth } from "./config";

const provider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, provider);
    console.log("result", result);
    const { displayName, email, photoURL, uid } = result.user;
    /*const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log("credential", credential);*/
    return {
      ok: true,
      //User Info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}: CreateUserI) => {
  try {
    const res = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = res.user;
    //TODO: actualizar name en firebase
    if (FirebaseAuth.currentUser !== null) {
      await updateProfile(FirebaseAuth.currentUser, { displayName });
    }
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  //signInWithEmailAndPassword
  try {
    const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);

    const { uid, displayName, photoURL } = res.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
