import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Info, Shield } from "lucide-react";

const Footer = () => {
    return (
        <motion.footer
            className="bg-blue-600 text-white py-6 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <p className="text-center md:text-left">
                    &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
                </p>
                <div className="space-x-6 mt-4 md:mt-0 flex">
                    <Link to="/about" className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
                        <Info size={16} />
                        <span>About</span>
                    </Link>
                    <Link to="/contact" className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
                        <Mail size={16} />
                        <span>Contact</span>
                    </Link>
                    <Link to="/privacy-policy" className="flex items-center space-x-1 hover:text-yellow-300 transition-colors">
                        <Shield size={16} />
                        <span>Privacy Policy</span>
                    </Link>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
