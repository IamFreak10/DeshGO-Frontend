import React from 'react';
import { FaPlaneDeparture, FaBus, FaPhoneAlt, FaMapMarkedAlt, FaFirstAid, FaPassport } from 'react-icons/fa';
import { motion } from 'framer-motion';

const tips = [
  {
    icon: <FaPhoneAlt className="text-3xl text-indigo-500 dark:text-indigo-400" />,
    title: 'Stay Connected',
    desc: 'Ensure mobile connectivity and carry a power bank for emergencies.',
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl text-green-500 dark:text-green-400" />,
    title: 'Carry a Map',
    desc: 'Always carry a digital or paper map to navigate unfamiliar places.',
  },
  {
    icon: <FaFirstAid className="text-3xl text-red-500 dark:text-red-400" />,
    title: 'First Aid Kit',
    desc: 'Carry a small first aid kit with essential medicines and bandages.',
  },
  {
    icon: <FaPassport className="text-3xl text-yellow-500 dark:text-yellow-400" />,
    title: 'Keep Documents Handy',
    desc: 'Keep photocopies and digital backups of important travel documents.',
  },
];

const TravelTips = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#FFE3BB] to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 md:px-20">
      {/* Flying Airplane */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '120%' }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute top-4 left-0"
      >
        <FaPlaneDeparture className="text-5xl text-blue-400 rotate-12" />
      </motion.div>

      {/* Moving Bus (faster) */}
      <motion.div
        initial={{ x: '110%' }}
        animate={{ x: '-50%' }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-4 right-0"
      >
        <FaBus className="text-4xl text-green-600" />
      </motion.div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">✈️ Travel Tips & Safety Guidelines</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Stay informed and travel smart with these practical safety and travel tips.
        </p>
      </div>

      {/* Tips Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300"
          >
            <div className="mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{tip.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{tip.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelTips;
