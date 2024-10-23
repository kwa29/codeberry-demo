import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PhotoCardProps {
  image: string;
  likes: number;
  comments: number;
  author: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ image, likes, comments, author }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg bg-white shadow-sm">
      <img 
        src={image} 
        alt={`Photo by ${author}`}
        className="w-full h-64 object-cover"
      />
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-between items-center text-white">
          <span className="font-medium">{author}</span>
          <div className="flex gap-4">
            <button className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    aria-label="Like photo">
              <Heart size={20} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    aria-label="Comment on photo">
              <MessageCircle size={20} />
              <span>{comments}</span>
            </button>
            <button className="hover:text-green-500 transition-colors"
                    aria-label="Share photo">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;