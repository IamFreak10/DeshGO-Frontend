import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import UseAuth from '../../Hooks/UseAuth';

const StoryCard = ({ story, navigate }) => {
  const { _id, title, content, images, postedBy, createdAt } = story;
  const { user } = UseAuth();

  const shareUrl = `${window.location.origin}/story/${_id}`;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition space-y-3">
      {/* Story Image */}
      {images?.[0] && (
        <img
          src={images[0]}
          alt="story"
          className="w-full h-44 object-cover rounded-md"
        />
      )}

      {/* Title and Content */}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600 line-clamp-3">{content}</p>

      {/* Author and Time */}
      <div className="text-xs text-gray-500">
        Posted by: <span className="font-medium">{postedBy}</span><br />
        <span>{new Date(createdAt).toLocaleString()}</span>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => (window.location.href = `/story/${_id}`)}
          className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          View
        </button>

        {user ? (
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            hashtag="#travel"
          >
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
