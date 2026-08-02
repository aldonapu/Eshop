import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/header';
import './Order.scss';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../servis/firebase";
import { useEffect, useState } from "react";
import { useAppContext } from '../App';
import { doc, updateDoc } from "firebase/firestore";
const Order = () => {
  const navigate = useNavigate();
    const { currentuser } = useAppContext();
    const [orders, setOrders] = useState([]);

useEffect(() => {
  const getOrders = async () => {
    if (!currentuser) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", currentuser.uid)
    );

    const snapshot = await getDocs(q);

    const orderData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setOrders(orderData);
  };

  getOrders();

}, [currentuser]);

const confirmOrder = async (orderId) => {
  try {
    const orderRef = doc(db, "orders", orderId);

    await updateDoc(orderRef, {
      status: "completed",
    });

    alert("Pesanan berhasil diterima.");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="order-page">
      <Header />
      <main className="order-content">
        <section className="order-hero">
          <div>
            <p className="order-hero__meta">Order History</p>
            <p className="order-hero__description">View order status, date, and timeline details per order.</p>
          </div>
          <button className="order-hero__back" type="button" onClick={() => navigate('/Eshop')}>
            Back to Store
          </button>
        </section>
        {orders.length === 0 ? (
        <div className="order-empty">
            <p>You have no orders yet.</p>
        </div>
        ) : (
  orders.map((order) => (
    <article className="order-card" key={order.id}>

      <header className="order-card__header">
        <div>
          <h2>{order.id}</h2>

          <p>
            {order.createdAt?.toDate()
              .toLocaleString("id-ID")
            }
          </p>

        </div>

    <span className={`order-status order-status--${order.status}`}>
        {order.status}
    </span>
      </header>


      <div className="order-card__details">

        <div>
          <p className="label">
            Pembeli
          </p>

          <strong>
            {order.customer?.nama}
          </strong>
        </div>


      </div>


      <div className="timeline-panel">
        <h3>Product</h3>
        {order.products?.map((product) => (
          <p key={product.id} className="order-product-item">
            {product.nama}
          </p>
        ))}
      </div>

      <div className="order-total-bottom">
        <span>Total Order</span>
        <strong>Rp {order.total.toLocaleString('id-ID')}</strong>
      </div>

      <div className="order-card__footer">
        {order.status === 'shipping' && (
          <button className="btn-receive" onClick={() => confirmOrder(order.id)}>
            Terima Pesanan
          </button>
        )}

        {order.status === 'completed' && (
          <span className="order-completed">✅ Pesanan Selesai</span>
        )}
      </div>

    </article>
  ))
)}
      </main>
    </div>
  );
};

export default Order;
