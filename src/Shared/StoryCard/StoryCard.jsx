import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import UseAuth from '../../Hooks/UseAuth';
import { Link } from 'react-router';

const StoryCard = ({ story }) => {
  const { _id, title, content, images, postedBy, createdAt } = story;
  const { user } = UseAuth();

  const shareUrl = `https://deshgo-ff79f.web.app/story/${_id}`;

  return (
    <div className="bg-white dark:bg-gray-400 shadow-md rounded-xl p-4  hover:shadow-lg transition space-y-3">
      {/* Story Image */}
      {images?.[0] && (
        <img
          src={images[0]}
          alt="story"
          className="w-full h-44 object-cover rounded-md"
        />
      )}

      {/* Title and Content */}
      <div className='space-y-2 border-b pb-2 w-full h-[120px]'>
        <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{content}</p>
      </div>
      {/* Author and Time */}
      <div className="text-xs text-gray-500">
        Posted by: <span className="font-medium">{postedBy}</span>
        <br />
        <span>{new Date(createdAt).toLocaleString()}</span>
      </div>
      </div>

      {/* Buttons */}
      <div className="flex  justify-between items-center pt-2">
        <Link
          to={`/story/${_id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          View Story
        </Link>

        {user ? (
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        ) : (
          <button
            onClick={() => (window.location.href = '/login')}
            aria-label="Login to share"
            className="cursor-pointer"
          >
            <FacebookIcon size={32} round />
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryCard;
