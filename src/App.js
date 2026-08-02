import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { createContext, useState, useContext } from 'react';
import FlyToCart from './component/FlyToCart';

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const AppContext = createContext();
export const useAppContext = () =>useContext(AppContext);



function App() {
  const [cart, setCart] = useState([]);
  const [currentuser, setCurrentUser] = useState(null);
  const [flyItem, setFlyItem] = useState(null);
  const [cartPosition, setCartPosition] = useState(null);

  return (
  
    <AppContext.Provider
    value={{
    cart,
    setCart,
    flyItem,
    setFlyItem,
    cartPosition,
    setCartPosition,
    currentuser,
    setCurrentUser,
  }}
>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Eshop" element={<Dashboard />} />
        <Route path="/detail/" element={<Detail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    <FlyToCart />
  
    </AppContext.Provider>
    
  );
}

export default App;
