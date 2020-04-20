import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import 'assets/stylesheets/application.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Spinner from 'components/Spinner';

const Layout = ({ children, pageName }) => {
  const [spinner, setSpinner] = useState(true);
  let className = '';

  if (pageName) {
    className = `${className} page-${pageName}`;
  }

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000)
  }, []);

  useEffect(() => {
    setSpinner(false);
  }, [!spinner]);

  return (
    <>
      {spinner ? <Spinner /> :
        <>
          <Helmet bodyAttributes={{ class: className }}>
            <title>Gatsby Site</title>
          </Helmet>
          <div className="wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </>
      }
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageName: PropTypes.string
};

export default Layout;
