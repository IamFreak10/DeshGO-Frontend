import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaSuitcaseRolling, FaUserTie } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import 'react-tabs/style/react-tabs.css';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const tabsData = [
  {
    name: 'Our Packages',
    icon: <FaSuitcaseRolling />,
    textColor: 'text-[#E84A5F]',
    panelTextColor: 'text-[#E84A5F]',
    endpoint: '/random/packages',
  },
  {
    name: 'Meet Our Tour Guides',
    icon: <FaUserTie />,
    textColor: 'text-[#6ad48a]',
    panelTextColor: 'text-[#6ad48a]',
    endpoint: '/tourguides/random',
  },
];

export default function TourismTabs() {
  const axiosSecure = useAxiosSecure();
  const { data: packages = [], isLoading: loadingPackages } = useQuery({
    queryKey: ['randomPackages'],
    queryFn: async () => {
      const res = await axiosSecure.get('/random/packages');
      return res.data;
    },
  });

  const { data: tourGuides = [], isLoading: loadingGuides } = useQuery({
    queryKey: ['randomTourGuides'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tourguides/random');
      return res.data;
    },
  });
  console.log(tourGuides);
  console.log(packages);

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-xl shadow-md bg-amber-100 dark:bg-gray-900 transition-all duration-300">
      <Tabs
        defaultIndex={0}
        selectedTabClassName="!ring-2 !ring-offset-2 !ring-blue-500 dark:!ring-amber-400"
      >
        <TabList className="flex flex-wrap gap-4 mb-6">
          {tabsData.map((tab, idx) => (
            <Tab
              key={idx}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition duration-200 hover:scale-105 font-semibold ${tab.textColor} bg-white dark:bg-gray-800`}
            >
              {tab.icon}
              {tab.name}
            </Tab>
          ))}
        </TabList>

        {/* Packages Tab Panel */}
        <TabPanel className="rounded-lg p-6 bg-white dark:bg-gray-800">
          {loadingPackages ? (
            <p className="text-center text-gray-500">Loading packages...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4"
                >
                  <img
                    src={pkg.coverImage}
                    alt={pkg.title}
                    className="h-40 w-full object-cover rounded"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Type: {pkg.type}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Price: ${pkg.price}
                    </p>
                    <Link to={`/package/${pkg._id}`}>
                      <button className="mt-3 bg-[#E84A5F] hover:bg-[#d1384f] text-white px-4 py-2 rounded shadow">
                        View Package
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabPanel>

        {/* Tour Guides Tab Panel */}
        <TabPanel className="rounded-lg p-6 bg-white dark:bg-gray-800">
          {loadingGuides ? (
            <p className="text-center text-gray-500">Loading tour guides...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tourGuides.map((guide) => (
                <div
                  key={guide._id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4"
                >
                  <img
                    src={guide.photo}
                    alt={guide.name}
                    className="h-40 w-full object-cover rounded"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {guide.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Experience: {guide.experience} yrs
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Language: {guide.language}
                    </p>
                    <Link to={`/guide/${guide._id}`}>
                      <button className="mt-3 bg-[#6ad48a] hover:bg-[#52c078] text-white px-4 py-2 rounded shadow">
                        View Guide
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
}
