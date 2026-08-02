import React ,{ useRef, useState }from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc,setDoc} from "firebase/firestore";
import { auth, db } from "../servis/firebase";

import { Toast } from "primereact/toast";
const Register = () => {

const toast = useRef(null);
 const [user, setUser] = useState({
    nama: "",
    email: "",
    password: "",
    username: "",
  });
const handleChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value,
  });
};

const register = async (e) => {
  e.preventDefault();

  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      nama: user.nama,
      username: user.username,
      email: user.email,
      role: "customer",
    });

        toast.current.show({
        severity: "success",
        summary: "Account Created",
        life: 1000,
    });

    setUser({
      nama: "",
      username: "",
      email: "",
      password: "",
    });

  } catch (err) {
    alert(err.message);
    console.log(err);
  }
};

  return (
    <div className="register-page">
      <Toast ref={toast} />
      <div className="register-card">
        <div className="register-card__image" aria-hidden="true">
          <div className="register-card__image-overlay">
            <h2>Create account</h2>
            <p>Join Eshop and discover the best deals for your next purchase.</p>
          </div>
        </div>

        <div className="register-card__form">
          <div className="register-card__header">
            <p className="register-card__eyebrow">Eshop</p>
            <h1>Create Account</h1>
            <p>Fill in your details to get started.</p>
          </div>

          <form className="register-form" onSubmit={register}>
            <label className="register-form__field" htmlFor="name">
              <span>Nama</span>
              <input id="name" name="nama" type="text" placeholder="Enter your full name" onChange={handleChange} value={user.nama} />
            </label>

            <label className="register-form__field" htmlFor="email">
              <span>Email</span>
              <input id="email" name="email" type="email" placeholder="Enter your email" onChange={handleChange} value={user.email} />
            </label>

            <label className="register-form__field" htmlFor="password">
              <span>Password</span>
              <input id="password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} value={user.password} />
            </label>

            <button className="register-form__button" type="submit">
              Sign Up
            </button>
          </form>

          <p className="register-card__footer">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
