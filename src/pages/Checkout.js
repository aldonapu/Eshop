import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import Header from '../component/header';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../servis/firebase";
import { useNavigate } from "react-router-dom";
import './Checkout.scss';
import { Toast } from "primereact/toast";


const Checkout = () => {
  const { cart, currentuser, setCart } = useAppContext();
  const subTotal = cart.reduce((total, item) => total + item.harga * item.qty, 0);
  const shippingCost = cart.length > 0 ? 15000 : 0;
  const total = subTotal + shippingCost;
  const navigate = useNavigate();
  const toast = useRef(null);
  const handlePayment = async () => {
  try {
    if (!currentuser) {
      alert("Silahkan login terlebih dahulu");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart masih kosong");
      return;
    }


    const orderData = {
      userId: currentuser.uid,
      customer: {
        nama: currentuser.nama,
        email: currentuser.email,
        phone: currentuser.phone || "",
        address: currentuser.address || "",
        city: currentuser.city || "",
      },

      products: cart.map((item) => ({
        id: item.id,
        nama: item.nama,
        gambar: item.gambar,
        harga: item.harga,
        qty: item.qty,
      })),

      subtotal: subTotal,
      shippingCost: shippingCost,
      total: total,

      paymentMethod: "COD",
      status: "pending",

      createdAt: serverTimestamp(),
    };


    // Simpan order ke Firestore
    await addDoc(collection(db, "orders"), orderData);


    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Order Successfully Created' });


    // kosongkan cart
    // jika Anda punya setCart dari Context
    setCart([])

      setTimeout(() => {
         navigate("/Eshop");
    }, 1000);;

  } catch (error) {
    console.log(error);
    toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
  }
};
  return (
    <div className="checkout-page">
      <Header />
      <main className="checkout-page__main">
        <Toast ref={toast}  />
        <section className="checkout-panel">
          <div className="checkout-panel__header">
            <h1>Checkout</h1>
            <p>Review your order and select a payment method.</p>
          </div>

          <div className="checkout-card">
            <div className="checkout-card__section-title">Shipping Address</div>
            <div className="checkout-address">
              <div>
                <p className="checkout-address__name">{currentuser?.phone || 'Phone Number'}</p>
                <p className="checkout-address__name">{currentuser?.nama || 'Customer Name'}</p>
                <p className="checkout-address__name">{currentuser?.city || 'City'}</p>
                <p className="checkout-address__detail">{currentuser?.address || 'Shipping Address'}</p>
              </div>
              <Link to="/profile" className="checkout-address__edit">
                Change
              </Link>
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card__section-title">Shipping Method</div>
            <div className="shipping-options">
              <label className="shipping-option">
                <input type="radio" name="shipping" defaultChecked />
                <div>
                  <strong>Reguler</strong>
                  <p>3-5 Days, Rp 15.000</p>
                </div>
              </label>
              <label className="shipping-option">
                <input type="radio" name="shipping" />
                <div>
                  <strong>Express</strong>
                  <p>1-2 Days, Rp 28.000</p>
                </div>
              </label>
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card__section-title">Payment Method</div>
            <div className="payment-options">
              <label className="payment-option">
                <input type="radio" name="payment" defaultChecked />
                <span>COD</span>
              </label>
            </div>
          </div>
        </section>

        <aside className="checkout-summary">
          <div className="checkout-summary__card">
            <div className="checkout-summary__title">Order Summary</div>
            {cart.length === 0 ? (
              <div className="checkout-summary__empty">
                <p>Cart is empty.</p>
                <Link to="/Eshop" className="checkout-summary__link">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="checkout-summary__items">
                  {cart.map((item) => (
                    <div className="checkout-summary__item" key={item.id}>
                      <img src={item.gambar} alt={item.nama} />
                      <div className="checkout-summary__item-info">
                        <p>{item.nama}</p>
                        <span>{item.qty} x Rp {item.harga.toLocaleString('id-ID')}</span>
                      </div>
                      <strong>Rp { (item.harga * item.qty).toLocaleString('id-ID') }</strong>
                    </div>
                  ))}
                </div>
                <div className="checkout-summary__totals">
                  <div className="checkout-summary__row">
                    <span>Subtotal</span>
                    <strong>Rp {subTotal.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="checkout-summary__row">
                    <span>Shipping Cost</span>
                    <strong>Rp {shippingCost.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="checkout-summary__row checkout-summary__row--total">
                    <span>Total</span>
                    <strong>Rp {total.toLocaleString('id-ID')}</strong>
                  </div>
                </div>
                <button type="button" className="checkout-summary__button" onClick={handlePayment}>
                  Pay Now
                </button>
              </>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Checkout;
