import React from 'react';

import Container from '@material-ui/core/Container';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>&copy; { new Date().getFullYear() }, Covid-19 App</p>
      </Container>
    </footer>
  );
};

export default Footer;
