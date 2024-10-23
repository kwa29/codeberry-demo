import React from 'react';
import PhotoCard from './PhotoCard';

interface Photo {
  id: string;
  url: string;
  likes: number;
  comments: number;
  author: string;
}

const mockPhotos: Photo[] = [
  {
    id: '1',
    url: 'https://source.unsplash.com/random/800x600?nature',
    likes: 123,
    comments: 45,
    author: 'John Doe'
  },
  // Add more mock photos as needed
];

const PhotoGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockPhotos.map(photo => (
          <PhotoCard
            key={photo.id}
            image={photo.url}
            likes={photo.likes}
            comments={photo.comments}
            author={photo.author}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;