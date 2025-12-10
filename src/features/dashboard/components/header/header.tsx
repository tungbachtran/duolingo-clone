// src/features/dashboard/components/header/header.tsx
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/user.context';
import { ROUTE } from '@/features/authentication/constants';
import {  Flame, Heart, Bell, Settings, FlaskConical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const {user} = useUser()
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Logo (optional) */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">D</span>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="flex items-center gap-3">
            

       
           
              
              <Button onClick={()=>navigate(ROUTE.COURSE)} className=" font-bold text-sm cursor-pointer text-white bg-green-400 hover:bg-green-500">Chọn khóa học</Button>
          

            {/* Streak */}
            <div className="flex items-center gap-2  px-4 py-2 rounded-xl hover:shadow-md transition-all cursor-pointer group border-2">
              <Flame className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="text-orange-600 font-black text-lg">{user?.streakCount}</span>
            </div>

             {/* Streak */}
             <div className="flex items-center gap-2  px-4 py-2 rounded-xl hover:shadow-md transition-all cursor-pointer group border-2">
              <FlaskConical  className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="text-orange-600 font-black text-lg">{user?.experiencePoint}</span>
            </div>

            {/* Hearts */}
            <div className="flex items-center gap-2  px-4 py-2 rounded-xl hover:shadow-md transition-all cursor-pointer group border-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-red-600 font-black text-lg">{user? user.heartCount : 0}</span>
            </div>

           

      
          </div>
        </div>
      </div>
    </header>
  );
};
