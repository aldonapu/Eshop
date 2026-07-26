import React from 'react';
import { Link } from 'react-router-dom';
import './bestseller.scss';

const Bestseller = ({ products, onAddToCart, formatRupiah }) => {
  if (!products?.length) return null;

  return (
    <section className="bestseller">
      <div className="bestseller__header">
        <div>
          <p className="bestseller__eyebrow">Best Seller</p>
          
        </div>
      
      </div>

      <div className="bestseller__grid">
        {products.map((product) => (
          <article className="bestseller__card" key={product.id}>
            <Link to={`/detail/${product.id}`} state={{ product }} className="bestseller__image-link">
              <div className="bestseller__image">
                <img src={product.gambar} alt={product.nama} />
              </div>
            </Link>

            <div className="bestseller__content">
              <span className="bestseller__badge">Best Seller</span>
              <h3>{product.nama}</h3>
              <p>{formatRupiah(product.harga)}</p>
              <button type="button" className="bestseller__button" onClick={(e) => onAddToCart(e,product)}>
                Add To Chart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Bestseller;
