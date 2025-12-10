
import { useParams, useNavigate } from 'react-router-dom';
import {  getUnitAndLessonNotLocked } from '@/features/dashboard/services';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const UnitList = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

    const{data,isFetching} = useQuery({queryKey:['unitsAndLessons',courseId], queryFn:()=>getUnitAndLessonNotLocked(courseId),refetchOnMount:true})


 

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            ← Quay lại
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Danh sách Unit</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.value.data.items.map((unit) => (
            <Card
              key={unit._id}
              className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/unit/${unit._id}/theories`)}
            >
              <div className="relative h-48">
                <img
                  src={unit.thumbnail}
                  alt={unit.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Unit {unit.displayOrder}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {unit.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {unit.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>{unit.lessons?.length || 0} bài học</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/unit/${unit._id}/theories`);
                    }}
                  >
                    Xem lý thuyết
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitList;
