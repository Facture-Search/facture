import { useCarousel } from "@facture/hooks";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    element: JSX.Element[];
    shiftSize: number;
}

export function Carousel({ element, shiftSize }: Props) {
    const { direction, selected, setSelected } = useCarousel(element.length, 0);

    if (element.length > 0)
        return (
            <div className="flex items-center justify-between space-x-3">
                <button
                    className="font-bold text-gray-700 hover:text-gray-900 transition-all bg-gray-100 hover:bg-gray-200 p-3 rounded-xl"
                    onClick={() => setSelected((prev) => prev - 1)}
                >
                    {"<"}
                </button>
                {/* **** Fix this!!!! */}
                <div className="flex-auto overflow-hidden">
                    <AnimatePresence>
                        <motion.div
                            key={selected}
                            initial={{ x: direction === "increasing" ? shiftSize : -1 * shiftSize }}
                            animate={{ x: 0 }}
                            exit={{ x: direction === "increasing" ? -1 * shiftSize : shiftSize }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            {element[selected]}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <button
                    className="font-bold text-gray-700 hover:text-gray-900 transition-all bg-gray-100 hover:bg-gray-200 p-3 rounded-xl"
                    onClick={() => setSelected((prev) => prev + 1)}
                >
                    {">"}
                </button>
            </div>
        );

    return null;
}

export default Carousel;
