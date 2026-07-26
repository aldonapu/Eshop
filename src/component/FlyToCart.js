import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../App";

export default function FlyToCart() {

    const {
        flyItem,
        setFlyItem,
        cartPosition
    } = useAppContext();

    if (!flyItem || !cartPosition) return null;

    return (
        <AnimatePresence>

            <motion.img
                src={flyItem.image}
                initial={{
                    left: flyItem.x,
                    top: flyItem.y,
                    width: flyItem.width,
                    height: flyItem.height,
                    scale: 1,
                    opacity: 1
                }}
                animate={{
                    left: cartPosition.x,
                    top: cartPosition.y,
                    width: 30,
                    height: 30,
                    scale: 0.2,
                    rotate: 360,
                    opacity: 0.2
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeInOut"
                }}
                style={{
                    position: "fixed",
                    pointerEvents: "none",
                    zIndex: 9999
                }}
                onAnimationComplete={() => {
                    setFlyItem(null);
                }}
            />

        </AnimatePresence>
    );
}