import { checkingCredentials, login, logout } from "./authSlice";
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from "../../firebase/providers";
import { CreateUserI } from "../../entities";
import { clearNotesLogout } from "../journal/journalSlice";

export const checkingAuthentication = (
  email: string,
  password: string
): any => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = (): any => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    console.log(result);
    dispatch(login(result));
  };
};

export const startRegisterUserWithEmailPassword = ({
  email,
  displayName,
  password,
}: CreateUserI): any => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        displayName,
        password,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = (
  email: string,
  password: string
): any => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage, displayName } =
      await loginWithEmailPassword(email, password);

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogout = (): any => {
  return async (dispatch: any) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout(null));
  };
};
