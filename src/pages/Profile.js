import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../App';
import Header from '../component/header';
import './Profile.scss';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../servis/firebase";
import { Toast } from "primereact/toast";
const Profile = () => {
  const { currentuser, setCurrentUser } = useAppContext();
  const toast = useRef(null);
  const [form, setForm] = useState({
    nama: '',
    email: '',
    username: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    if (currentuser) {
      setForm({
        nama: currentuser.nama || '',
        email: currentuser.email || '',
        username: currentuser.username || '',
        phone: currentuser.phone || '',
        address: currentuser.address || '',
        city: currentuser.city || '',
        postalCode: currentuser.postalCode || '',
      });
    }
  }, [currentuser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSave = async (e) => {
  e.preventDefault();

  try {
    if (!currentuser?.uid) {
      alert("User tidak ditemukan");
      return;
    }

    const userRef = doc(db, "users", currentuser.uid);

    const updatedData = {
      nama: form.nama,
      username: form.username,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
    };

    // Update Firestore
    await updateDoc(userRef, updatedData);

    // Update Context
    setCurrentUser((prev) => ({
      ...prev,
      ...updatedData,
    }));

    // Update localStorage
    localStorage.setItem(
      "currentuser",
      JSON.stringify({
        ...currentuser,
        ...updatedData,
      })
    );

    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Profile data updated successfully' });

  } catch (error) {
    console.error("Update profile error:", error);
    toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
  }
};

  if (!currentuser) {
    return (
      <div className="profile-page">
        <Header />
        <main className="profile-page__content">
          <div className="profile-empty">
            <p>Anda belum login.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-page__content">
        <Toast ref={toast} />
        <section className="profile-top-card">
          <div className="profile-top-card__avatar">
            {currentuser.foto ? (
              <img src={currentuser.foto} alt={currentuser.nama} />
            ) : (
              <span>{currentuser.nama?.slice(0, 2).toUpperCase() || 'U'}</span>
            )}
          </div>
          <div className="profile-top-card__info">
            <h1>{currentuser.nama}</h1>
            <p>{currentuser.email}</p>
            {currentuser.username && <p>@{currentuser.username}</p>}
          </div>
        </section>

        <form className="profile-edit-grid" onSubmit={handleSave}>
          <div className="profile-card profile-card--wide">
            <div className="profile-card__header">
              <h2>User Information</h2>
            </div>
            <div className="profile-form">
              <label>
                Name
                <input name="nama" value={form.nama} onChange={handleChange} />
              </label>
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} />
              </label>
              <label>
                Username
                <input name="username" value={form.username} onChange={handleChange} />
              </label>
              <label>
                Phone
                <input name="phone" value={form.phone} onChange={handleChange} />
              </label>
            </div>
          </div>

          <div className="profile-card profile-card--wide">
            <div className="profile-card__header">
              <h2>Shipping Address</h2>
            </div>
            <div className="profile-form">
              <label>
                Alamat
                <textarea name="address" value={form.address} onChange={handleChange} rows={3} />
              </label>
              <div className="profile-form__row">
                <label>
                  Kota
                  <input name="city" value={form.city} onChange={handleChange} />
                </label>
                <label>
                  Kode Pos
                  <input name="postalCode" value={form.postalCode} onChange={handleChange} />
                </label>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button type="submit" className="profile-button">
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
