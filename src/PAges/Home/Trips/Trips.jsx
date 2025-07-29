import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Trips = () => {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPackages, setTotalPackages] = useState(0);
  const limit = 10;
  const totalPages = Math.ceil(totalPackages / limit);

  useEffect(() => {
    fetch(`http://localhost:5000/packages?page=${currentPage}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setPackages(data.packages);
        setTotalPackages(data.total);
      });
  }, [currentPage]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Trips</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div key={pkg._id} className="card bg-base-100 shadow-xl">
            <figure><img src={pkg.coverImage} alt="cover" className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
              <h2 className="card-title">{pkg.title}</h2>
              <p>{pkg.about?.slice(0, 100)}...</p>
              <div className="card-actions justify-end">
                <Link to={`/package/${pkg._id}`} className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          {[...Array(totalPages).keys()].slice(0, 5).map(num => (
            <button
              key={num}
              className={`join-item btn ${currentPage === num + 1 ? 'btn-active' : ''}`}
              onClick={() => setCurrentPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}
          {totalPages > 5 && <button className="join-item btn">...</button>}
          <button
            className="join-item btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trips;
