import React from 'react';
import Banner from './Banner/Banner';
import Overview from './OverviewSection/Overview';
import TourismTabs from './TourismTab/TourismTabs';

const Home = () => {
  return (
    <>
      <div className='flex flex-col space-y-6'>
        <Banner></Banner>
        <Overview></Overview>
        <TourismTabs></TourismTabs>
      </div>
    </>
  );
};

export default Home;
