import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../servis/firebase";
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../App';
import { Toast } from "primereact/toast";

const Login = () => {
  const { setCurrentUser} = useAppContext();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value,
  });
};

const login = async (e) => {
  e.preventDefault();

  try {
    // Login ke Firebase Authentication
    const result = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    // Ambil data user dari Firestore
    const userRef = doc(db, "users", result.user.uid);
    const userSnap = await getDoc(userRef);
    console.log(userSnap.exists());
    if (userSnap.exists()) {
      const userData = userSnap.data();
      setCurrentUser(userData);
     
      setUser(userData);

      // Simpan ke localStorage agar tetap login setelah refresh
      localStorage.setItem("currentuser", JSON.stringify(userData));

      toast.current.show({ severity: "success", summary: "Login Successful", detail: "You have been logged in." });
      console.log(toast.current);
      setTimeout(() => {
         navigate("/Eshop");
    }, 1000);
    } else {
      toast.current.show({ severity: "error", summary: "Login Failed", detail: "User data not found." });
    }
  } catch (err) {
    console.log(err);
    toast.current.show({ severity: "error", summary: "Login Failed", detail: err.message });
  }
};
  return (
    <div className="login-page">
      <Toast ref={toast} />
      <div className="login-card">
        <div className="login-card__image" aria-hidden="true">
          <div className="login-card__image-overlay">
            <h2>Welcome back</h2>
            <p>Sign in to continue shopping and enjoy exclusive offers.</p>
          </div>
        </div>

        <div className="login-card__form">
          <div className="login-card__header">
            <p className="login-card__eyebrow">Eshop</p>
            <h1>Welcome Back</h1>
            <p>Please enter your details to continue.</p>
          </div>

          <form className="login-form" onSubmit={login}>
            <label className="login-form__field" htmlFor="email">
              <span>Email</span>
              <input id="email" type="email" placeholder="you@example.com" onChange={handleChange} name="email" value={user.email} />
            </label>

            <label className="login-form__field" htmlFor="password">
              <span>Password</span>
              <input id="password" type="password" placeholder="Enter password" onChange={handleChange} name="password" value={user.password} />
            </label>

            <button className="login-form__button" type="submit">
              Sign In
            </button>
          </form>

          <p className="login-card__footer">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
