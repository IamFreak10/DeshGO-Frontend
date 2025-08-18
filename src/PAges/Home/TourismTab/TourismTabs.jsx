import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaSuitcaseRolling, FaUserTie } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import 'react-tabs/style/react-tabs.css';
import { motion } from 'framer-motion';
import useAxios from '../../../Hooks/UseAxios';
import PackageCard from '../../../Shared/PacakgeCard/PackageCard';
import Tguide from '../../../Shared/TourGuideCrad/Tguide';

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
  const axiosInstance = useAxios();
  const { data: packages = [], isLoading: loadingPackages } = useQuery({
    queryKey: ['randomPackages'],
    queryFn: async () => {
      const res = await axiosInstance.get('/random/packages');
      return res.data;
    },
  });

  const { data: tourGuides = [], isLoading: loadingGuides } = useQuery({
    queryKey: ['randomTourGuides'],
    queryFn: async () => {
      const res = await axiosInstance.get('/tourguides/random');
      return res.data;
    },
  });

  return (
    <div className="w-[100%] mx-auto p-6 rounded-xl shadow-md bg-[#F4DEB3] dark:bg-gray-900 transition-all duration-300">
      <Tabs
        defaultIndex={0}
        selectedTabClassName="!ring-2 !ring-offset-2 !ring-blue-500  dark:!ring-amber-400"
      >
        <TabList className="flex flex-wrap gap-4 mb-6">
          {tabsData.map((tab, idx) => (
            <Tab
              key={idx}
              className={`flex items-center  gap-2 px-4 py-2 rounded-lg cursor-pointer transition duration-200 hover:scale-105 font-semibold ${tab.textColor} bg-white dark:bg-gray-800`}
            >
              {tab.icon}
              {tab.name}
            </Tab>
          ))}
        </TabList>

        {/* Packages Tab Panel */}
        <TabPanel className="rounded-lg p-6 ">
          {loadingPackages ? (
            <p className="text-center text-gray-500">Loading packages...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg,index) => (
              
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0,x: -30, y: -30 }}
                  whileInView={{ opacity: 1,x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: false }}
                 
                >
                  <PackageCard pkg={pkg} />
                </motion.div>
              ))}
            </div>
          )}
        </TabPanel>

        {/* Tour Guides Tab Panel */}
        <TabPanel className="rounded-lg p-6  dark:bg-gray-800">
          {loadingGuides ? (
            <p className="text-center text-gray-500">Loading tour guides...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tourGuides.map((guide,index) => (
                <motion.div
                  key={guide._id}
                  
                  initial={{ opacity: 0,x: -30, y: -30 }}
                  whileInView={{ opacity: 1,x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: false }}
                  
                >
                  <Tguide guide={guide} />
                  
                </motion.div>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
}
