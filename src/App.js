import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Detail';
import { createContext, useState, useContext } from 'react';
import FlyToCart from './component/FlyToCart';
import Footer from './component/footer';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const AppContext = createContext();
export const useAppContext = () =>useContext(AppContext);



function App() {
  const [cart, setCart] = useState([]);
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
    setCartPosition
  }}
>
    <BrowserRouter>
      <Routes>
        <Route path="/Eshop" element={<Dashboard />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
    <FlyToCart />
    <Footer />
    </AppContext.Provider>
    
  );
}

export default App;
