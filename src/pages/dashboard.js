import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import CountriesList from 'components/dashboard/CountriesList';

const Dashboard = () => {
  return (
    <Layout pageName="dashboard">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <CountriesList />
    </Layout>
  );
};

export default Dashboard;
