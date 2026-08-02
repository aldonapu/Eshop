import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../component/header';
import './Detail.scss';
import { useAppContext } from '../App';
import { Toast } from "primereact/toast";
import { Rating } from 'primereact/rating';
const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const produk =location.state;
  const {cart,setCart} = useAppContext()
  const toast = useRef(null);

   const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

  const addToCart = (e, produk) => {
    console.log(cart)
    setCart((prev) => {
       
        const exist = prev.find((item) => item?.id === produk.id);

        if (exist) {
           
            return prev.map((item) =>
            item.id === produk.id
                ? { ...item, qty: item.qty + 1 }
                : item
            );
        } else {
            
            return [...prev, { ...produk, qty: 1 }];
        }
    });
   
    
    toast.current.show({
        severity: "success",
        summary: `${produk.nama} Added`,
        life: 1000,
    });
  };

  return (
    <div className="detail-page">
      <Header />
      <main className="detail-page__content">
        <Toast ref={toast} />
        <section className="detail-card">
          <div className="detail-card__media">
            <div className="detail-card__image"><img src={produk.gambar} /></div>
            
          </div>

          <div className="detail-card__info">
            <p className="detail-card__eyebrow">Produk unggulan</p>
            <h1>{produk.nama}</h1>
            <p className="detail-card__price">{formatRupiah(produk.harga)}</p>
            <p className="detail-card__description">{produk.deskripsi}</p>
            <p className="detail-card__stock">stock: {produk.stock}</p>
           <div className="detail-card__rating">
              <Rating value={produk.rating} readOnly cancel={false} className="product-rating"/>
              <span>({produk.rating})</span>
            </div>
            <div className="detail-card__specs">
              {produk.specs?.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="detail-card__actions">

              <button type="button" className="detail-card__cart" onClick={(e)=>addToCart(e, produk)}>
                Add to cart
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Detail;
