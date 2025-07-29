import React from 'react';
import Banner from './Banner/Banner';
import Overview from './OverviewSection/Overview';
import TourismTabs from './TourismTab/TourismTabs';
import Random$Story from './Random4stroy/Random$Story';

const Home = () => {
  return (
    <>
      <div className='flex flex-col space-y-6'>
        <Banner></Banner>
        <Overview></Overview>
        <TourismTabs></TourismTabs>
        <Random$Story></Random$Story>
      </div>
    </>
  );
};

export default Home;
