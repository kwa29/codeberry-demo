import React from 'react';
import SearchBar from './SearchBar';
import UploadButton from './UploadButton';
import ProfileSection from './ProfileSection';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">PhotoShare</div>
          <SearchBar />
          <div className="flex items-center gap-4">
            <UploadButton />
            <ProfileSection />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;