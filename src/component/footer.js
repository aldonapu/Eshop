import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <h3>Estore</h3>

          <div className="footer__socials">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>

        <div className="footer__links">
          <h4>Quick Access</h4>
          <ul>
            <li><a href="/">Beranda</a></li>
            <li><a href="/detail/1">Best Products</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>service</h4>
          <ul>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Return</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <span>+62 812 3456 7890</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>support@eshop.com</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>Tomohon, Indonesia</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 ShopHub. Semua hak dilindungi.</p>
      </div>
    </footer>
  );
};

export default Footer;
