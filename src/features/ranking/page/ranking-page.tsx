// pages/leaderboard.tsx
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '../services'; 
import type { LeaderboardItem } from '../services'; 
import { useUser } from '@/context/user.context'; 
import { Loader2, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const medalColors: Record<number, string> = {
  1: 'bg-yellow-400 text-yellow-900',
  2: 'bg-gray-300 text-gray-900',
  3: 'bg-amber-600 text-amber-50',
};

const LeaderboardPage = () => {
  const { user } = useUser(); // user.id
  const { data, isLoading, isError, refetch, isFetching } = useQuery<LeaderboardItem[]>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
  });

  const currentUserEntry = useMemo(
    () => data?.find((u) => u._id === user?._id),
    [data, user?._id]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-white">
        <p className="text-lg font-semibold text-red-600 mb-2">Không tải được bảng xếp hạng</p>
        <p className="text-sm text-gray-500 mb-4">Vui lòng kiểm tra lại kết nối và thử lại.</p>
        <Button onClick={() => refetch()}>Thử lại</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Bảng xếp hạng
            </h1>
          </div>
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

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Card rank hiện tại của user */}
        {currentUserEntry && (
          <div className="bg-green-400 rounded-2xl shadow-lg p-4 md:p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <div className="relative">
                {currentUserEntry.avatarImage ? (
                  <img
                    src={currentUserEntry.avatarImage}
                    alt={currentUserEntry.fullName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/60"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                    {currentUserEntry.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  Hạng {currentUserEntry.rank}
                </span>
              </div>
              <div>
                <p className="text-sm opacity-80">Xếp hạng của bạn</p>
                <h2 className="text-lg md:text-xl font-semibold">
                  {currentUserEntry.fullName}
                </h2>
                <p className="text-xs md:text-sm opacity-90">
                  {currentUserEntry.experiencePoint} điểm kinh nghiệm
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 podium */}
        {data.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
              Top 3 dẫn đầu
            </h3>
            <div className="flex items-end justify-center gap-4 md:gap-8">
              {/* Hạng 2 */}
              {data[1] && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xs font-medium text-gray-500 mb-1">#2</div>
                  <div className="relative mb-1">
                    {data[1].avatarImage ? (
                      <img
                        src={data[1].avatarImage}
                        alt={data[1].fullName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                        {data[1].fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-gray-800 text-center line-clamp-1">
                    {data[1].fullName}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {data[1].experiencePoint} điểm
                  </p>
                  <div className="w-10 md:w-12 h-14 md:h-16 bg-gray-200 rounded-t-md" />
                </div>
              )}

              {/* Hạng 1 */}
              {data[0] && (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="text-xs font-bold text-yellow-500">#1</span>
                  </div>
                  <div className="relative mb-1">
                    {data[0].avatarImage ? (
                      <img
                        src={data[0].avatarImage}
                        alt={data[0].fullName}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-yellow-300"
                      />
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-100 flex items-center justify-center text-2xl font-bold text-yellow-700">
                        {data[0].fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-900 text-center line-clamp-1">
                    {data[0].fullName}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {data[0].experiencePoint} điểm
                  </p>
                  <div className="w-12 md:w-16 h-20 md:h-24 bg-yellow-200 rounded-t-md" />
                </div>
              )}

              {/* Hạng 3 */}
              {data[2] && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xs font-medium text-gray-500 mb-1">#3</div>
                  <div className="relative mb-1">
                    {data[2].avatarImage ? (
                      <img
                        src={data[2].avatarImage}
                        alt={data[2].fullName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-amber-600/60"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-lg font-bold text-amber-700">
                        {data[2].fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-gray-800 text-center line-clamp-1">
                    {data[2].fullName}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {data[2].experiencePoint} điểm
                  </p>
                  <div className="w-10 md:w-12 h-12 md:h-14 bg-amber-100 rounded-t-md" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bảng xếp hạng đầy đủ */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">
              Tất cả người chơi
            </p>
            <p className="text-xs text-gray-500">
              {data.length} người
            </p>
          </div>

          <div className="divide-y">
            {data.map((item) => {
              const isCurrentUser = item._id === user?._id;
              const medalClass = medalColors[item.rank] || '';
              return (
                <div
                  key={item._id}
                  className={`flex items-center px-4 py-3 text-sm ${
                    isCurrentUser
                      ? 'bg-green-50 border-l-4 border-green-400'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Rank + medal */}
                  <div className="w-12 flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        medalClass || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      #{item.rank}
                    </div>
                  </div>

                  {/* Avatar + name */}
                  <div className="flex-1 flex items-center gap-3">
                    {item.avatarImage ? (
                      <img
                        src={item.avatarImage}
                        alt={item.fullName}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                        {item.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <p
                        className={`font-medium ${
                          isCurrentUser ? 'text-green-400' : 'text-gray-900'
                        }`}
                      >
                        {item.fullName}
                        {isCurrentUser && (
                          <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-sky-100 text-green-400 font-semibold">
                            Bạn
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.experiencePoint} điểm kinh nghiệm
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
