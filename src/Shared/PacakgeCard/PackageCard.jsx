import React from 'react';
import { Link } from 'react-router';

const PackageCard = ({ pkg }) => {
  return (
    <div
      key={pkg._id}
      className="h-[600px] md:h-[475px] bg-gradient-to-b from-[#9B7EBD] to-[#C5D3E8] 
  dark:from-[#4b504b] dark:to-[#292828]  rounded-2xl  w-full   shadow-2xl"
    >
      <figure>
        <img
          src={pkg.coverImage}
          alt="cover"
          className="h-48 w-full  object-cover"
        />
      </figure>
      <div className=" h-42 p-2">
        <h1 className="text-3xl text-[#085720] dark:text-[#6ad48a] font-bold">{pkg.name}</h1>
        <h2 className="text-xl font-bold text-gray-600 dark:text-white">{pkg.title}</h2>
        <p className='mt-2 text-lg font-semibold'>{pkg.about?.slice(0, 100)}...</p>
      </div>
      <div className="w-3/4 mt-43 md:mt-13  mx-auto   ">
        <Link
          to={`/package/${pkg._id}`}
          className="btn  text-xl font-semibold  bg-[#E84A5F] w-[100%]"
        >
         Explore Now
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
