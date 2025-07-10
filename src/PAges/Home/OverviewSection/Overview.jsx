import React from 'react';

const Overview = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
        {/* ✅ Video Embed */}
        <div className="w-full md:w-1/2 rounded-2xl aspect-video overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/VHRzdbb3pbg?autoplay=1&mute=1&loop=1&playlist=VHRzdbb3pbg&controls=0&modestbranding=1"
            title="Discover Bangladesh"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* ✅ Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 leading-snug">
            Discover the{' '}
            <span className="text-green-500">Beauty of Bangladesh</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            From the world's longest sea beach at Cox’s Bazar to the serene
            hills of Sajek and mystical Sundarbans, embark on an unforgettable
            visual journey through the land of rivers and culture.
          </p>
          <a
            href="https://youtu.be/YEByQP7D-S0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Watch Full Video on YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default Overview;
