import React from 'react';

const categories = ['All', 'Nature', 'Travel', 'Family', 'Architecture', 'Food', 'Animals'];

const Categories: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
      <div className="flex gap-2 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full bg-white shadow-sm hover:shadow
                       transition-shadow duration-200 whitespace-nowrap
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;