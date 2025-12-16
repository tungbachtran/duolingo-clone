// src/features/dashboard/components/Sidebar/SidebarItem.tsx
import { ROUTE } from '@/features/authentication/constants';
import { logout } from '@/features/authentication/services/auth';
import { useMutation } from '@tanstack/react-query';
import type { LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string; // Static path
  dynamicPath?: (courseId: string) => string; // Dynamic path
  color?: string;
  courseId?: string;
}

export const SidebarItem = ({ 
  id,
  label, 
  icon: Icon, 
  path, 
  dynamicPath,
  color, 
  courseId 
}: SidebarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useMutation({mutationFn:()=>logout()});

  // Tính toán path thực tế
  const actualPath = dynamicPath && courseId 
    ? dynamicPath(courseId) 
    : path || '#';
  
  // Check active - so sánh với path thực tế
  const isActive = location.pathname === actualPath;
  
 

  const handleClick = async () => {
    if(id === 'logout'){
      await mutation.mutateAsync();


      navigate(ROUTE.HOME, { replace: true });
      return
    }
    
    navigate(actualPath);
  };

  return (
    <button
      onClick={handleClick}

      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl
        transition-all duration-200 text-left
        ${isActive 
          ? 'bg-blue-100 border-2 border-blue-400' 
          : 'hover:bg-gray-100 border-2 border-transparent'
        }
       
      `}
    >
      <Icon className={`w-6 h-6 ${color || 'text-gray-600'}`} />
      <span className={`
        text-sm font-bold uppercase tracking-wide
        ${isActive ? 'text-blue-600' : 'text-gray-600'}
      `}>
        {label}
      </span>
      
    </button>
  );
};
