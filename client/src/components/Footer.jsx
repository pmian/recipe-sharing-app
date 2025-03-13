const Footer = () => {
    return (
        <footer className="bg-blue-600 text-white py-6 mt-auto">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-center md:text-left">
                    &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
                </p>
                <div className="space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-yellow-300 transition-colors">
                        About
                    </a>
                    <a href="#" className="hover:text-yellow-300 transition-colors">
                        Contact
                    </a>
                    <a href="#" className="hover:text-yellow-300 transition-colors">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;