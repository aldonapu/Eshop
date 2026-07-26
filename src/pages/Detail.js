import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../component/header';
import './Detail.scss';

const fallbackProduct = {
  id: 1,
  name: 'Earbuds Pro',
  price: 'Rp 299.000',
  badge: 'Terlaris',
  emoji: '🎧',
  description:
    'Earbuds Pro dengan kualitas suara jernih, noise cancellation, dan daya tahan baterai sampai 24 jam. Cocok untuk kebutuhan kerja, belajar, dan hiburan.',
  specs: ['Koneksi cepat', 'Baterai tahan lama', 'Mudah dibawa'],
};

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || fallbackProduct;

  return (
    <div className="detail-page">
      <Header cartCount={2} />

      <main className="detail-page__content">
        <button type="button" className="detail-page__back" onClick={() => navigate(-1)}>
          ← Kembali
        </button>

        <section className="detail-card">
          <div className="detail-card__media">
            <div className="detail-card__image">{product.emoji}</div>
            <span className="detail-card__badge">{product.badge}</span>
          </div>

          <div className="detail-card__info">
            <p className="detail-card__eyebrow">Produk unggulan</p>
            <h1>{product.name}</h1>
            <p className="detail-card__price">{product.price}</p>
            <p className="detail-card__description">{product.description}</p>

            <div className="detail-card__specs">
              {product.specs?.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="detail-card__actions">
              <button type="button" className="detail-card__buy">
                Beli sekarang
              </button>
              <button type="button" className="detail-card__cart">
                Tambah ke keranjang
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Detail;
