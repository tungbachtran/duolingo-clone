import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Loader2,
  Mail,
  Award,
  Flame,
  Heart,
  CheckCircle2,
  XCircle,
  Pencil,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';


import { uploadFile } from '@/service/file.service';
import { getProfile, updateProfile, type Profile } from '../services';

const ProfilePage = () => {

  const queryClient = useQueryClient();

  // ===== UI MODE =====
  const [isEditing, setIsEditing] = useState(false);

  // ===== FORM STATE =====
  const [fullName, setFullName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ===== QUERY =====
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  // ===== MUTATIONS =====
  const uploadAvatarMutation = useMutation({
    mutationFn: uploadFile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      resetForm();
      setIsEditing(false);
    },
  });

  // ===== HELPERS =====
  const resetForm = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setShowChangePassword(false);
    setPassword('');
    setConfirmPassword('');
    if (profile) {
      setFullName(profile.fullName);
    }
  };

  // ===== HANDLERS =====
  const handleEdit = () => {
    if (!profile) return;
    setIsEditing(true);
    setFullName(profile.fullName);
  };

  const handleCancel = () => {
    resetForm();
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    let avatarUrl: string | undefined;

    if (avatarFile) {
      const uploadRes = await uploadAvatarMutation.mutateAsync(avatarFile);
      avatarUrl = uploadRes.url;
    }

    if (showChangePassword) {
      if (!password || password !== confirmPassword) {
        alert('Mật khẩu nhập lại không khớp');
        return;
      }
    }

    updateProfileMutation.mutate({
      fullName,
      avatarImage: avatarUrl,
      password: showChangePassword ? password : undefined,
    });
  };

  // ===== UI STATES =====
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 mb-3">Không tải được hồ sơ</p>
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

  // ===== RENDER =====
  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* ===== PROFILE CARD ===== */}
        <div className="bg-white rounded-xl border p-6 space-y-4">

          {/* AVATAR */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {avatarPreview ? (
                <img src={avatarPreview} className="w-full h-full object-cover" />
              ) : profile.avatarImage ? (
                <img src={profile.avatarImage} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-2xl font-bold">
                  {profile.fullName.charAt(0)}
                </div>
              )}
            </div>

            {isEditing && (
              <Input type="file" accept="image/*" onChange={handleAvatarChange} />
            )}
          </div>

          {/* FULL NAME */}
          {isEditing ? (
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Họ và tên"
            />
          ) : (
            <h2 className="text-xl font-semibold">{profile.fullName}</h2>
          )}

          {/* META */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {profile.email}
            </span>

            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                profile.isActive
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {profile.isActive ? (
                <span className="flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Hoạt động
                </span>
              ) : (
                <span className="flex items-center">
                  <XCircle className="w-3 h-3 mr-1" /> Không hoạt động
                </span>
              )}
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Hoạt động gần nhất: {lastActiveText}
          </p>

          {/* CHANGE PASSWORD */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Đổi mật khẩu
          </Button>

          {showChangePassword && (
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
  
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-2">
            {!isEditing ? (
              <Button onClick={handleEdit} variant="outline">
                <Pencil className="w-4 h-4 mr-1" />
                Chỉnh sửa thông tin
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSaveProfile}
                  disabled={
                    uploadAvatarMutation.isPending ||
                    updateProfileMutation.isPending
                  }
                  className="bg-sky-500 hover:bg-sky-600"
                >
                  {(uploadAvatarMutation.isPending ||
                    updateProfileMutation.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Lưu
                </Button>

                <Button variant="outline" onClick={handleCancel}>
                  Hủy
                </Button>
              </>
            )}
          </div>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<Award />} label="Kinh nghiệm" value={profile.experiencePoint} />
          <StatCard icon={<Flame />} label="Chuỗi ngày học" value={profile.streakCount} />
          <StatCard icon={<Heart />} label="Tim" value={profile.heartCount} />
          <StatCard
            label="Tham gia từ"
            value={new Date(profile.createdAt).toLocaleDateString('vi-VN')}
          />
        </div>

       
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  icon?: React.ReactNode;
}) => (
  <div className="bg-white border rounded-xl p-4">
    <div className="flex justify-between text-xs text-gray-500 mb-1">
      <span>{label}</span>
      {icon}
    </div>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default ProfilePage;
