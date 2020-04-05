import React from 'react';
import Layout from './components/Layout/Layout';
import BurderBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div>
      <Layout>
        <BurderBuilder />
      </Layout>
    </div>
  );
}

export default App;
