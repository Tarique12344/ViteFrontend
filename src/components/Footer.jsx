import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} PetStore. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
