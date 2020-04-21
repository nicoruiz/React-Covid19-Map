import favicon from '../../favicon.ico';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from 'components/Layout';
import CountriesList from 'components/dashboard/CountriesList';

const Dashboard = () => {
  return (
    <Layout pageName="dashboard">
      <Helmet>
        <title>Covid-19 Dashboard</title>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
      <CountriesList />
    </Layout>
  );
};

export default Dashboard;
