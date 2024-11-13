import React from 'react';
import '../style/Style.css'; // Здесь будут стили для Footer

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
            <div className="footer-links">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
            </div>
        </footer>
    );
};

export default Footer;
