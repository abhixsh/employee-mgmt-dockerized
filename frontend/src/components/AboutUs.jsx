// src/components/AboutUs.jsx
import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
        >
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-lg text-gray-600">
                We are dedicated to making employee management efficient and effective.
                Our team values integrity, efficiency, and support for our clients.
            </p>
        </motion.div>
    );
}
