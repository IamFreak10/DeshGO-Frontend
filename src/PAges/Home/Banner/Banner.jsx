import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import cox from '../../../assets/Banner/cox.jpeg';
import tanguarhaur from '../../../assets/Banner/tanguarhaur.jpg';
import sajek from '../../../assets/Banner/sajek.jpg';
import saintmartin from '../../../assets/Banner/saintmartin.jpeg';
import sylhetchabagn from '../../../assets/Banner/sylhetchabagn.jpeg';
import kuakata from '../../../assets/Banner/kuakata.jpg';
import atghorkuriana from '../../../assets/Banner/atghorkuriana.jpg';
import paharpur from '../../../assets/Banner/paharpur.jpg';
import ahsanmonzil from '../../../assets/Banner/ahsanmonzil.jpg';

const banners = [
  {
    img: cox,
    title: "Cox's Bazar",
    subtitle:
      'Explore the world’s longest uninterrupted sandy beach, a breathtaking stretch of golden shore and crashing waves — a must-visit for sea lovers.',
  },
  {
    img: sajek,
    title: 'Sajek Valley',
    subtitle:
      'Discover Sajek’s serene hilltops, cloud-covered landscapes, and tribal warmth in the heart of Rangamati — a true rooftop of Bangladesh.',
  },
  {
    img: tanguarhaur,
    title: 'Tanguar Haor',
    subtitle:
      'Sail through the pristine waters of Sunamganj’s Tanguar Haor — a floating haven rich with biodiversity, sunsets, and fisherman life.',
  },
  {
    img: saintmartin,
    title: 'Saint Martin’s Island',
    subtitle:
      'Step onto Bangladesh’s only coral island, where turquoise waters, coconut groves, and serenity blend into the perfect tropical escape.',
  },
  {
    img: sylhetchabagn,
    title: 'Sylhet Tea Gardens',
    subtitle:
      'Wander through rolling hills covered in emerald tea plantations, where mist, aroma, and culture steep together in peaceful harmony.',
  },
  {
    img: kuakata,
    title: 'Kuakata Sea Beach',
    subtitle:
      'Witness the rare beauty of both sunrise and sunset over the sea — Kuakata, the daughter of the sea, awaits your footprints.',
  },
  {
    img: atghorkuriana,
    title: 'Sundarbans – Atghor Kuriana',
    subtitle:
      'Enter the wild mystery of the Sundarbans, where rivers whisper secrets and the Royal Bengal Tiger roams through ancient mangroves.',
  },
  {
    img: paharpur,
    title: 'Paharpur Mahavihara',
    subtitle:
      'Explore the majestic ruins of this ancient Buddhist monastery — a UNESCO World Heritage Site that echoes stories of Bengal’s golden era.',
  },
  {
    img: ahsanmonzil,
    title: 'Ahsan Manzil',
    subtitle:
      'Step back into royal elegance at Dhaka’s iconic Pink Palace — once the Nawab’s residence, now a window into our architectural past.',
  },
];

const Banner = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={4000}
      stopOnHover={false}
      transitionTime={800}
      className="relative z-10 shadow-lg rounded-2xl overflow-hidden"
    >
      {banners.map((item, index) => (
        <div key={index} className="relative">
          <img
            src={item.img}
            alt={item.title}
            className="w-full max-h-[90vh] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex items-end md:items-center justify-start px-6 pb-10 md:pb-0 md:px-20 text-left">
            <div className="max-w-2xl">
              <h2 className="text-xl md:text-5xl font-bold text-white drop-shadow-lg">
                {item.title}
              </h2>
              <p className="text-xs md:text-xl mt-2 text-gray-200">
                {item.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
