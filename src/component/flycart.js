// FlyToCart.jsx

import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../App";
import { cartRef } from "./Header";

export default function FlyToCart(){

const { flyItem, setFlyItem, cartPosition } = useAppContext();

if(!flyItem) return null;

const cart=cartRef.current.getBoundingClientRect();

return(

<AnimatePresence>

<motion.img

src={flyItem.image}

initial={{
x:flyItem.x,
y:flyItem.y,
scale:1,
opacity:1
}}

animate={{
x:cart.left,
y:cart.top,
scale:0.2,
opacity:0.2,
rotate:360
}}

exit={{opacity:0}}

transition={{
duration:0.8,
ease:"easeInOut"
}}

style={{
position:"fixed",
width:120,
height:120,
pointerEvents:"none",
zIndex:9999
}}

onAnimationComplete={()=>setFlyItem(null)}

/>

</AnimatePresence>

);

}