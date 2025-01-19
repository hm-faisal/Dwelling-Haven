import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./../../firebase/firebase.config";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const axiosBase = useAxios();

  // authentication state observer and get user data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const user = { email: currentUser.email };
        axiosBase
          .post("/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }
            setUser(currentUser);
            setLoading(false);
          })
          .catch((e) => console.log(e));
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
        setLoading(false);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Add user role

  const { _data, isLoading: roleLoading } = useQuery({
    queryKey: ["users", user],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      setLoading(true);
      const { data } = await axiosBase.get(`/users/${user?.email}`);
      setUserRole(data.role);
      setLoading(false);
      return data;
    },
  });

  // Register New user with email password

  const signUpUserWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user profile

  const updateUser = (displayName, photoURL) => {
    const userNameAndProfileImage = { displayName, photoURL };
    return updateProfile(auth.currentUser, userNameAndProfileImage);
  };

  // Sign in existing users with firebase

  const signInUserWithEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Sign out existing User

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Delete signIn user

  const deleteCurrentUser = () => {
    setLoading(true);
    return deleteUser(user);
  };

  /**
   * All Auth Context Values
   */
  const AuthContextValue = {
    user,
    loading,
    userRole,
    setUser,
    setLoading,
    signUpUserWithEmailPassword,
    updateUser,
    signInUserWithEmailPassword,
    googleSignIn,
    signOutUser,
    deleteCurrentUser,
    roleLoading,
  };
  return (
    <>
      <AuthContext.Provider value={AuthContextValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
