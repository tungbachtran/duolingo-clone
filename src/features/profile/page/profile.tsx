// pages/profile.tsx
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services';
import type { Profile } from '../services'; 
import { Loader2, Heart, Flame, Award, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading, isError, refetch, isFetching } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-white">
        <p className="text-lg font-semibold text-red-600 mb-2">
          Không tải được thông tin hồ sơ
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Vui lòng kiểm tra kết nối và thử lại.
        </p>
        <Button onClick={() => refetch()}>
          {isFetching && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Thử lại
        </Button>
      </div>
    );
  }

  const lastActiveText = formatDistanceToNow(new Date(profile.lastActiveAt), {
    addSuffix: true,
    locale: vi,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hồ sơ của bạn</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Làm mới
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Card thông tin user */}
        <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar đơn giản lấy chữ cái đầu */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white shadow-md">
              {profile.fullName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {profile.fullName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="inline-flex items-center text-xs text-gray-600">
                  <Mail className="w-3 h-3 mr-1" />
                  {profile.email}
                </span>
                <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-medium">
                  {profile.roleId?.name || 'User'}
                </span>
                <span
                  className={`inline-flex items-center text-[11px] px-2 py-0.5 rounded-full ${
                    profile.isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {profile.isActive ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Đang hoạt động
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      Không hoạt động
                    </>
                  )}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Hoạt động gần nhất: {lastActiveText}
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/leaderboard')}
            >
              <Award className="w-4 h-4 mr-1" />
              Xem bảng xếp hạng
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/courses')}
              className="bg-sky-500 hover:bg-sky-600"
            >
              Luyện tập ngay
            </Button>
          </div>
        </div>

        {/* Card thống kê */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* XP */}
          <div className="bg-white rounded-xl shadow-sm border p-3 md:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Kinh nghiệm</span>
              <Award className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {profile.experiencePoint}
            </p>
            <p className="text-[11px] text-gray-500">
              Tích lũy qua các bài tập đã hoàn thành
            </p>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-xl shadow-sm border p-3 md:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Chuỗi ngày học</span>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {profile.streakCount}
            </p>
            <p className="text-[11px] text-gray-500">
              Ngày liên tiếp bạn đã duy trì luyện tập
            </p>
          </div>

          {/* Hearts */}
          <div className="bg-white rounded-xl shadow-sm border p-3 md:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Tim (cơ hội)</span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              {profile.heartCount}
            </p>
            <p className="text-[11px] text-gray-500">
              Số lần sai bạn có thể “xài” trong một bài học
            </p>
          </div>

          {/* Ngày tham gia */}
          <div className="bg-white rounded-xl shadow-sm border p-3 md:p-4 flex flex-col gap-2">
            <span className="text-xs font-medium text-gray-500">Tham gia từ</span>
            <p className="text-sm font-semibold text-gray-900">
              {new Date(profile.createdAt).toLocaleDateString('vi-VN')}
            </p>
            <p className="text-[11px] text-gray-500">
              Cảm ơn bạn đã đồng hành cùng nền tảng 💙
            </p>
          </div>
        </div>

        {/* (Optional) chỗ để sau này gắn thêm lịch sử học, thành tích,... */}
      </div>
    </div>
  );
};

export default ProfilePage;
