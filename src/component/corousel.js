import React, { useEffect, useState } from 'react';
import './corousel.scss';


const slides = [
  {
    title: 'Promo Mingguan',
    subtitle: 'Diskon sampai 70% untuk kebutuhan rumah tangga',
    badge: 'Hari ini',
    
  },
  {
    title: 'Paket Elektronik',
    subtitle: 'Nikmati cashback dan free ongkir untuk gadget favorit',
    badge: 'Baru',
    
  },
  {
    title: 'Best Seller',
    subtitle: 'Temukan gadget trendi dengan harga terjangkau',
    badge: 'Spesial',
    
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="carousel" aria-label="Banner promo">
      <button type="button" className="carousel__button" onClick={previousSlide}>
        ‹
      </button> 

      <div className="carousel__viewport">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <article
              className="carousel__slide"
              key={slide.title}
              style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 100%), url(${slide.image})` }}
            >
              <span className="carousel__badge">{slide.badge}</span>
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </article>
          ))}
        </div>
      </div>

      <button type="button" className="carousel__button" onClick={nextSlide}>
        ›
      </button>

      <div className="carousel__dots" aria-label="Pilih banner">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={`carousel__dot ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
