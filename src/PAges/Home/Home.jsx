import React from 'react';
import Banner from './Banner/Banner';
import Overview from './OverviewSection/Overview';

const Home = () => {
  return (
    <>
      <div className='flex flex-col space-y-6'>
        <Banner></Banner>
        <Overview></Overview>
      </div>
    </>
  );
};

export default Home;
