import React from 'react';
import { Link } from 'react-router';
import logo from '../../../public/logo.png';
const DeshGo = () => {
  return (
    <Link to="/">
      <div className="flex flex-row ">
        <img className="relative w-20 h-20" src={logo} alt="" />
        <p className="absolute mt-7 ml-12 text-4xl font-extrabold">
          <span className="text-[#6ad48a]">Desh</span>
          <span className="text-[#E84A5F]">GO</span>
        </p>
      </div>
    </Link>
  );
};

export default DeshGo;
