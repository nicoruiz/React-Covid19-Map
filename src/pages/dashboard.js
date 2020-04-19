import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';

const SecondPage = () => {
  return (
    <Layout pageName="two">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container type="content" className="text-center">
        <h1>Dashboard</h1>
        <h3>In construction</h3>
        <img src="https://media1.tenor.com/images/3e0fe1635ecd36113734082ceffe6ace/tenor.gif?itemid=4065668"></img>
      </Container>
    </Layout>
  );
};

export default SecondPage;
