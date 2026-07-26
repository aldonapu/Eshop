import React from 'react';
import './iklan.scss';

const promos = [
  {
    title: 'Flash Sale',
    subtitle: 'Diskon sampai 50% untuk produk elektronik pilihan',
    badge: 'Hari Ini',
    gradient: 'linear-gradient(135deg, #ff7a59 0%, #ff4d6d 100%)',
  },
  {
    title: 'Bundling Hemat',
    subtitle: 'Paket laptop + aksesoris dengan harga spesial',
    badge: 'Promo',
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)',
  },
  {
    title: 'New Arrival',
    subtitle: 'Lihat koleksi gadget Terbaru untuk anda',
    badge: 'Baru',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0f766e 100%)',
  },
];

const Iklan = () => {
  return (
    <section className="iklan" aria-label="Promo produk">
      <div className="iklan__list">
        {promos.map((promo, index) => (
          <article
            className="iklan__card"
            key={promo.title}
            style={{ background: promo.gradient }}
          >
            <div className="iklan__content">
              <span className="iklan__badge">{promo.badge}</span>
              <h3>{promo.title}</h3>
              <p>{promo.subtitle}</p>
              <button type="button">Belanja Sekarang</button>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
};

export default Iklan;
