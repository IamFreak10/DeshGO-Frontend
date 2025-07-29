import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { ScaleLoader } from 'react-spinners';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';

// Share Icons
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxios from '../../../Hooks/UseAxios';

const StoryDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();

  const {
    data: story,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['storyDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${id}`);
      return res.data;
    },
  });
  const { data: userInfo } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/users?search=${story.postedByEmail}`
      );
      return res.data;
    },
  });
  console.log(userInfo);

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <ScaleLoader color="#36d7b7" />
      </div>
    );
  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message}
      </div>
    );

  // 🔗 You can replace this with your actual domain later (e.g., localhost or ngrok)
  const shareUrl = `https://deshgo-ff79f.web.app/story/${story._id}`;
  const shareTitle = story.title;

  return (
    <div className="max-w-4xl mx-auto my-10 px-5">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition hover:shadow-xl duration-300">
        <h2 className="text-3xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">
          {story.title}
        </h2>

        <div className="flex items-center gap-3 mb-4">
          {userInfo?.[0]?.image ? (
            <img
              src={userInfo?.[0]?.image}
              alt="user"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-500 dark:text-gray-300" />
          )}
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {story.postedBy}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {story.postedByEmail}
            </p>
          </div>
          <div className="ml-auto text-xs text-gray-400 dark:text-gray-300">
            Posted on {moment(story.createdAt).format('MMMM Do YYYY, h:mm A')}
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-200 text-lg mb-6 leading-relaxed">
          {story.content}
        </p>

        {story.images?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {story.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`story-${index}`}
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        )}

        {/* 📤 Share Buttons */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Share this story:
          </h3>
          <div className="flex gap-3 flex-wrap">
            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <WhatsappShareButton url={shareUrl} title={shareTitle}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl} title={shareTitle}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>

            <EmailShareButton url={shareUrl} subject={shareTitle}>
              <EmailIcon size={40} round />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
