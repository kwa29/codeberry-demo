import React from 'react';
import { User } from 'lucide-react';

const ProfileSection: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <User className="text-gray-600" size={20} />
      </div>
      <div className="hidden md:block">
        <div className="text-sm font-medium">Guest User</div>
        <div className="text-xs text-gray-500">0 Photos</div>
      </div>
    </div>
  );
};

export default ProfileSection;