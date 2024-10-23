import React from 'react';
import { Upload } from 'lucide-react';

const UploadButton: React.FC = () => {
  const handleUpload = () => {
    // Implement upload functionality
    console.log('Upload clicked');
  };

  return (
    <button
      onClick={handleUpload}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                px-4 py-2 rounded-full flex items-center gap-2
                hover:shadow-lg transition-shadow duration-300"
      aria-label="Upload photo"
    >
      <Upload size={20} />
      <span className="hidden md:inline">Upload</span>
    </button>
  );
};

export default UploadButton;