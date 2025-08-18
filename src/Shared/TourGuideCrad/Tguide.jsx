import React from 'react';
import { Zoom } from 'react-awesome-reveal';
import { Link } from 'react-router';

const Tguide = ({ guide }) => {
    return (
          <Zoom
                  key={guide._id}
                  triggerOnce
                  delay={180}
                  duration={500}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-2 rounded-2xl shadow-md bg-white dark:bg-gray-900 p-4 hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={guide.photo || '/default-profile.png'}
                      alt={guide.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center truncate w-full">
                      {guide.name}
                    </h3>
                    <Link
                      to={`/tourguide/${guide._id}`}
                      className="mt-1 text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                  </div>
                </Zoom>
    );
};

export default Tguide;