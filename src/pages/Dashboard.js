import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/header';
import Carousel from '../component/corousel';
import Bestseller from '../component/bestseller';
import Iklan from '../component/iklan';
import FlashSale from '../component/flasesale';
import './Dashboard.scss';
import { db } from "../servis/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { useAppContext } from '../App';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptop,
  faMobileScreen,
  faClock,
  faCamera,
  faHeadphones,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {

  const[products, setProducts] = useState([]) ;
  const { cart, setCart, setFlyItem} = useAppContext()
  const[search, setSearch] =useState("");
  const [loading, setLoading] = useState(true);
  const addToCart = (e, product) => {
    // tombol yang diklik
    const button = e.currentTarget;

    // card tempat tombol berada
    const card = button.closest("article");

    // gambar di dalam card
    const image = card.querySelector("img");

    const rect = image.getBoundingClientRect();

    setFlyItem({
        image: product.gambar,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
    });
    setCart((prev) => {
       
        const exist = prev.find((item) => item.id === product.id);

        if (exist) {
           
            return prev.map((item) =>
            item.id === product.id
                ? { ...item, qty: item.qty + 1 }
                : item
            );
        } else {
            
            return [...prev, { ...product, qty: 1 }];
        }
    });

    // alert(`${product.nama} berhasil ditambahkan ke keranjang!`);
    // // toast.current.show({
    // //     severity: "success",
    // //     summary: `${product.nama} Ditambahkan`,
    // //     life: 1000,
    // // });
  };

  const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};
const filterProducts = products.filter(product => product.nama.toLowerCase().includes(search.toLowerCase()))

useEffect(() => {
  const loadProducts = async () => {
  try {
      setLoading(true);

      const res = await getDocs(collection(db, "products"));

      setProducts(
        res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  loadProducts();
  const interval = setInterval(() => {
    loadProducts();
  }, 2000);
  return () => clearInterval(interval);
}, []);

const bestSeller = products
    .filter(product => product.tags?.includes("bestSeller"))
    .slice(0, 6);

const flashsale = products
    .filter(product => product.tags?.includes("flashSale"))
    .slice(0, 4);

const categories = [
  { name: "Laptop", icon: faLaptop, count: "18 Items" },
  { name: "Smartphone", icon: faMobileScreen, count: "12 Items" },
  { name: "Smartwatch", icon: faClock, count: "9 Items" },
  { name: "Camera", icon: faCamera, count: "14 Items" },
  { name: "Audio", icon: faHeadphones, count: "11 Items" },
  { name: "Gaming", icon: faGamepad, count: "16 Items" },
];
  return (
    <div className="dashboard">
      <Header search={search} setSearch={setSearch} />
      <main className="dashboard__main">
        <Carousel />
        <Iklan />
        <FlashSale 
        products={flashsale}
        onAddToCart={addToCart}
        formatRupiah={formatRupiah}/>
        <section className="dashboard__section dashboard__section--categories">
          <div className="dashboard__section-header">
            <div>
              <p className="dashboard__eyebrow">Category</p>
             
            </div>
          </div>
          <div className="dashboard__categories">
            {categories.map((category) => (
              <div className="dashboard__category-card" key={category.name}>
                <div className="dashboard__category-icon"> <FontAwesomeIcon icon={category.icon} /></div>
                <h3>{category.name}</h3>
                <p>{category.count}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard__section">
          <div className="dashboard__section-header">
            <div>
              <p className="dashboard__eyebrow">Recomendation</p>
              <h2>Featured Products</h2>
            </div>
            <a href="#">View All</a>
          </div>

          <div className="dashboard__grid">
            {filterProducts.slice(0 , 8).map((product) => {
              return (
                <article className="product-card" key={product.id}>
                <Link to={`/detail/${product.id}`} state={{ product }}>
                  <div className="product-card__image"><img src={product.gambar} alt='produk'/></div>
                </Link>
                  <h3>{product.nama}</h3>
                  <p>{formatRupiah(product.harga)}</p>

                  <div className="product-card__actions">
                      <button type="button" onClick={(e) => addToCart(e, product)}>
                      Add To Chart
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <Bestseller
          products={bestSeller}
          onAddToCart={addToCart}
          formatRupiah={formatRupiah}
        />
      </main>
    </div>
  );
};

export default Dashboard;
