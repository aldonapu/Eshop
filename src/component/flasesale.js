import React, { useEffect, useMemo, useState } from 'react';
import './flashsale.scss';
import { useNavigate} from 'react-router-dom';
import { useAppContext } from '../App';
const FlashSale = ({ products, onAddToCart, formatRupiah }) => {
  const navigate = useNavigate()
  const{ currentuser} = useAppContext()
  const targetTime = useMemo(() => Date.now() + 1000 * 60 * 60 * 10 + 1000 * 60 * 30, []);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetTime - Date.now();
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <section className="flashsale">
      <div className="flashsale__content">
        <div className="flashsale__header">
          <div>
            <p className="flashsale__eyebrow">Flash Sale</p>
            <h2>Promo spesial berakhir sebentar lagi</h2>
            <p className="flashsale__text">
              Dapatkan diskon besar untuk produk pilihan dengan batas waktu terbatas.
            </p>
          </div>

          <div className="flashsale__countdown" aria-label="Countdown flash sale">
            <div className="flashsale__box">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <small>Jam</small>
            </div>
            <div className="flashsale__box">
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <small>Menit</small>
            </div>
            <div className="flashsale__box">
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <small>Detik</small>
            </div>
          </div>
        </div>

        <div className="flashsale__grid">
          {products.map((product) => (
            <article className="flashsale__card" key={product.id}>
                <div className="flashsale__image">
                  <img src={product.gambar} alt={product.nama} onClick={()=>navigate('/detail', {state : product})}/>
                </div>
  

              <div className="flashsale__card-body">
                <span className="flashsale__badge">Flash Deal</span>
                <h3>{product.nama}</h3>
                <p>{formatRupiah(product.harga)}</p>
                <button type="button" className="flashsale__button" onClick={(e) => !currentuser ? navigate('/') : onAddToCart(e, product)}>
                  Add To Chart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
