import React, { createContext, useState } from "react";
//
import firebase from "firebase/app";
import { addDocInDb, readDocInDb, db } from "../../database";
import { toast, Zoom } from "react-toastify";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { sign, verify } from "jsonwebtoken";
// import { verifyJWT, createJWT } from "../../Hooks/jwt";
// Config
const secret_jwt = process.env.REACT_APP_SECRET_JWT;
const ONE_DAY = 604800;
const KEY_TOKEN = "AUTH_TOKEN";
//
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userGoogle, setUserGoogle] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);

  //Effects
  React.useEffect(() => {
    verifyIsAuthenticated()
    // console.log(userGoogle);
    const unSubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        setUserGoogle({
          id: uid,
          name: displayName,
          avatar: photoURL ? photoURL : "",
        }); //setUser
      }
    }); //OnAuthStateChange

    return () => {
      unSubscribe();
    };
  }, []);

  // Hooks
  const verifyIsAuthenticated = React.useCallback(() => {
    const cookies = parseCookies(null)[KEY_TOKEN];
    if (!cookies) {
      return;
    }
    try {
      const jwtObj = verifyJWT(cookies);
      const userid = jwtObj["user_id"];
      if (!jwtObj) {
        setAuthenticate(false);
        return;
      }
      // Consult database
      (async () => {
        const adminRef = db.collection("users").get();
        const snap = (await adminRef).docs;
        snap.find((doc) => {
          let { id, name, avatar } = doc.data();
          if (id === userid) {
            setUserGoogle({
              id,
              name,
              avatar,
            });
            setAuthenticate(true);
            return;
          } else {
            setAuthenticate(false);
          }
        });
      })();
    } catch (err) {
      toast(err);
    }
  },[verifyJWT,parseCookies,userGoogle]);

  function createJWT(id) {
    return sign({ user_id: id }, secret_jwt, { algorithm: "HS512" });
  }
  function verifyJWT(jwt) {
    return verify(jwt, secret_jwt, { algorithms: "HS512" });
  }

  // Handle Functios
  function logOut() {
    destroyCookie(null, KEY_TOKEN);
    firebase
      .auth()
      .signOut()
      .catch((err) => console.log(err));
    setUserGoogle(null);
  }

  async function handleLoginEmailPass(dataForm) {
    const { email, password, rememberLogin } = dataForm;

    if (rememberLogin) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (!userCredential) {
          setAuthenticate(false);
          return;
        }
        const { uid } = userCredential.user;
        readDocInDb("users")
          .then((usersFromDb) => {
            const doc = usersFromDb.docs.find((x) => x.data().id === uid);
            const data = doc.data();
            const loginUser = {
              id: data.id,
              name: data.name,
              avatar: "",
            };
            setUserGoogle(loginUser);
            if(rememberLogin){
              const token = createJWT(uid);
              setCookie(null, KEY_TOKEN, token, {
                maxAge: ONE_DAY,
                path: "/",
              });
            }
            setAuthenticate(true);
          })
          .catch((err) => {
            toast(err);
            return;
          })
      })
      .catch((error) => {
        // Handle Errors here
        console.log(error);
        setAuthenticate(false);
        toast(error.message);
      });
  }

  async function createUserEmailPass(dataForm) {
    const { name, email, password, rememberLogin } = dataForm;
    if (rememberLogin) {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              const { uid } = userCredential.user;
              const newUser = {
                id: uid,
                name: name,
                avatar: "",
              };
              setUserGoogle(newUser);
              const userAdd = addDocInDb("users", newUser);
              const token = createJWT(uid);
              setCookie(null, KEY_TOKEN, token, {
                maxAge: ONE_DAY,
                path: "/",
              });
              setAuthenticate(true);
              return userAdd;
            })
            .catch((err) => toast(err));
        });
    } // persiste session

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const { uid } = userCredential.user;
        const newUser = {
          id: uid,
          name: name,
          avatar: "",
        };
        setUserGoogle(newUser);
        const userAdd = addDocInDb("users", newUser);
        setAuthenticate(true);
        return userAdd;
      })
      .catch((error) => {
        // Handle Errors here
        console.log(error);
        setAuthenticate(false);
        toast("Error on create user");
      });
  }

  function signinWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        // Auth
        const { displayName, photoURL, uid } = result.user;
        // const credential = result.credential;
        // const token = credential.accessToken;
        // console.log(token);
        if (!displayName) {
          toast("Error: User dont have a name!", {
            bodyStyle: {
              background: "#e91313",
              color: "#fff",
            },
          });
          return;
        }
        // Verify if user exist
        const docRef = db.collection("users");
        const snap = (await docRef.get()).docs;
        const query = snap.find((doc) => {
          let { id } = doc.data();
          return id === uid;
        });
        // Set user to app
        const newUser = {
          id: uid,
          name: displayName,
          avatar: photoURL,
        };
        setUserGoogle(newUser);
        if (!query) {
          addDocInDb("users", newUser)
            .then(() => {
              const token = createJWT(uid);
              setCookie(null, KEY_TOKEN, token, {
                maxAge: ONE_DAY,
                path: "/",
              });
              setAuthenticate(true);
            })
            .catch((err) => console.log(err));
        } else {
          const token = createJWT(uid);
          setCookie(null, KEY_TOKEN, token, {
            maxAge: ONE_DAY,
            path: "/",
          });
          setAuthenticate(true);
        }
      })
      .catch((error) => {
        // Handle Errors here
        console.log(error);
        setAuthenticate(false);
        toast(error.message);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        logOut,
        userGoogle,
        authenticate,
        handleLoginEmailPass,
        createUserEmailPass,
        signinWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
