import React, { useRef, useEffect } from 'react';
import './header.scss';
import { motion, useAnimation } from 'framer-motion';
import { useAppContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanel } from 'primereact/overlaypanel';
import { signOut } from 'firebase/auth';
import { auth } from '../servis/firebase';
import { useNavigate } from 'react-router-dom';

const Header = ({ search, setSearch }) => {
  const { cart, setCart, setCartPosition, currentuser, setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const cartRef = useRef(null);
  const profileRef = useRef(null);
  const controls = useAnimation();
  const op = useRef(null);
  const canSearch = typeof setSearch === 'function';

  useEffect(() => {
    if (cartRef.current) {
      const rect = cartRef.current.getBoundingClientRect();

      setCartPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [setCartPosition]);

  useEffect(() => {
    if (cart.length > 0) {
      controls.start({
        scale: [1, 1.25, 0.95, 1],
        transition: { duration: 0.4 },
      });
    }
  }, [cart.length, controls]);

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('user');
    setCurrentUser(null);
    profileRef.current?.hide();
    navigate('/');
  };

  const openProfile = (event) => {
    profileRef.current?.toggle(event);
  };

  const openProfilePage = () => {
    profileRef.current?.hide();
    navigate('/profile');
  };

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">E</span>
        <div>
          <h1 onClick={() => navigate('/Eshop')} style={{ cursor: 'pointer' }}>
            STORE
          </h1>
          <p>Electronic Store</p>
        </div>
      </div>

      {canSearch && (
        <div className="header__search">
          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="header__search-input"
          />
        </div>
      )}

      <div className="header__actions">
        {currentuser ? (
          <>
            
            <button type="button" className="header__avatar" onClick={openProfile}>
              {currentuser.foto ? (
                <img src={currentuser.foto} alt={currentuser.nama} />
              ) : (
                <span>{getInitials(currentuser.nama)}</span>
              )}
            </button>
          </>
        ) : (
          <button type="button" className="header__login" onClick={() => navigate('/')}>Masuk</button>
        )}

        <motion.button
          ref={cartRef}
          className="header__cart"
          animate={controls}
          onClick={(e) => op.current.toggle(e)}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <span>({cart.length})</span>
        </motion.button>
      </div>

      <OverlayPanel ref={profileRef} className="header__profile-overlay">
        {currentuser && (
          <div className="profile-card">
            <div className="profile-card__header">

              <div>
                <p className="profile-card__name">{currentuser.nama}</p>
                <p className="profile-card__email">{currentuser.email}</p>
              </div>
            </div>
            <button type="button" className="profile-card__button" onClick={openProfilePage}>
              Profile
            </button>
            <button type="button" className="profile-card__order" onClick={() => navigate('/order')}>
              Order History
            </button>
            <button type="button" className="profile-card__logout" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </OverlayPanel>

      <OverlayPanel ref={op} className="header__overlay">
        <div className="checkout-card">
          <div className="checkout-card__header">
            <div>
              <p className="checkout-card__eyebrow">My Cart</p>
              <h3>{cart.length} item</h3>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="checkout-card__empty">
              <p>Cart Empty</p>
              <span>Add ur favorite Product</span>
            </div>
          ) : (
            <>
              <div className="checkout-card__list">
                {cart.map((item) => (
                  <div className="checkout-card__item" key={item.id}>
                    <img src={item.gambar} alt={item.nama} />
                    <div className="checkout-card__item-info">
                      <h4>{item.nama}</h4>
                      <p>
                        {item.qty}x • {formatRupiah(item.harga)}
                      </p>
                    </div>
                    <div className="checkout-card__item-meta">
                      <strong>{formatRupiah(item.harga * item.qty)}</strong>
                      <button type="button" onClick={() => removeItem(item.id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-card__footer">
                <div>
                  <span>Total</span>
                  <strong>{formatRupiah(total)}</strong>
                </div>
                <button type="button" className="checkout-card__button" onClick={() => navigate('/checkout')}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </OverlayPanel>
    </header>
  );
};

export default Header;
