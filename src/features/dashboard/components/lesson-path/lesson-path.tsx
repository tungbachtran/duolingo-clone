// src/features/dashboard/components/lesson-path/lesson-path.tsx
import  { useState, useEffect, useRef } from "react";

import { CustomTooltip } from "@/components/custom-tooltip";
import { Star, Lock, Check, BookOpen } from "lucide-react";
import { getUnitAndLesson } from "../../services";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useQuery,  } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/context/user.context";
import { toast } from 'sonner';




export const LearningPath = () => {
  const [lessonId, setLessonId] = useState<string>("");
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
  const {refetchUser} = useUser();
  const location = useLocation();
  const navigate = useNavigate()
  const { data, isFetching } = useQuery({
    queryKey: ["unitsAndLessons", params.courseId],
    queryFn: () => getUnitAndLesson(params.courseId),
    gcTime:0,
    staleTime:0,
    refetchOnWindowFocus: true,
    refetchOnMount: true  });
 
    useEffect(() => {
      refetchUser();
    }, [refetchUser]);
    
  const units = data?.value.data.result
  const handleClickLesson = (id: string) => {
    setLessonId((prev) => (prev === id ? "" : id));
  };
  useEffect(() => {
    if (location.state === "NO_HEART_LEFT") {
      toast.error("Bạn đã hết tim. Hãy quay lại vào ngày mai nhé");

     
      navigate(".", { replace: true, state: null });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setLessonId("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!units) return null;

  // Tính toán vị trí zigzag cho lessons
  const getPositionClass = (index: number) => {
    const positions = ['justify-start pl-24', 'justify-center', 'justify-end pr-24'];
    return positions[index % positions.length];
  };





  if (isFetching) {
    return (
      <>
        <div className="flex justify-center items-center m-auto">
          <h1>Đang tải</h1>
          <Spinner />
        </div>
      </>
    )
  }
  return (
    
    <div className="flex-1 overflow-y-auto ">
     
      <div className="max-w-2xl mx-auto px-6 space-y-8">
        {units
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((unit) => (
            <div key={unit._id} className="relative mt-10">
              {/* Unit Header */}
              <div className="flex justify-center mb-12">
                <div className="relative">
                  <div className="bg-green-400 rounded-3xl px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8 text-white fill-white" />
                      <div>
                        <div className="text-xs text-white/80 font-semibold uppercase tracking-wider">
                          Đơn vị {unit.displayOrder}
                        </div>
                        <h2 className="text-xl font-black text-white">
                          {unit.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Lessons Path */}
              <div className="relative space-y-6">
                {unit.lessons
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((lesson, lessonIndex) => {

                    const positionClass = getPositionClass(lessonIndex);

                    return (
                      <div key={lesson._id} className="relative">
                        {/* Connecting Path */}
                        {lessonIndex > 0 && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-6 w-1">
                            <svg className="w-full h-full" viewBox="0 0 20 100" preserveAspectRatio="none">
                              <path
                                d={`M 10 0 Q ${lessonIndex % 3 === 1 ? '12' : lessonIndex % 3 === 2 ? '-2' : '10'} 50 10 100`}

                                fill="none"
                                stroke={lesson.isLocked === true ? '#D1D5DB' : '#10B981'}
                                strokeWidth="8"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        )}

                        {/* Lesson Node Container */}
                        <div className={`flex ${positionClass} relative`}>
                          <div
                            className="relative"
                            ref={lesson._id === lessonId ? tooltipRef : null}
                          >
                            {/* Tooltip */}
                            {lesson._id === lessonId && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50">
                                <CustomTooltip
                                  data={{
                                    _id: lesson._id,
                                    objective: lesson.objectives,
                                    unitId: unit._id,
                                    lessonPoint: lesson.experiencePoint,
                                  }}
                                />
                              </div>
                            )}

                            {/* Lesson Node */}
                            <Button
                              onClick={() => lesson.isLocked !== true && handleClickLesson(lesson._id)}
                              disabled={lesson.isLocked}
                              className={`
                                relative group
                                ${lesson.isLocked === true ? 'cursor-not-allowed' : 'cursor-pointer'}
                                ${lesson.isLocked === true && 'bg-gray-300/30'}
                                bg-green-400
                                h-20 w-20 rounded-full
                                hover:bg-green-500
                              `}
                            >
                              {/* Shadow/Base */}
                              <div className={`
                                absolute inset-0 rounded-full blur-xl transition-all duration-300
                                ${lesson.isLocked !== true && 'bg-green-400/50 group-hover:bg-green-400/70'}
                                ${lesson.isLocked === true && 'bg-gray-300/30'}
                              `}></div>

                              {/* Main Circle */}
                              <div className={`
                                relative w-20 h-20 rounded-full flex items-center justify-center
                                transition-all duration-300 transform
                                ${lesson.isLocked !== true && 'bg-green-400/50 group-hover:bg-green-400/70'}
                                ${lesson.isLocked === true && 'bg-gray-300/30'}
                              `}>
                                {/* Icon */}
                                {status === 'completed' && (
                                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                    <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
                                  </div>
                                )}
                                {lesson.isLocked !== true && (
                                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                    <BookOpen className="w-7 h-7 text-blue-600" />
                                  </div>
                                )}
                                {lesson.isLocked === true && (
                                  <Lock className="w-8 h-8 text-gray-500" />
                                )}

                                {/* Progress Ring for current */}
                                {lesson.isLocked !== true && (
                                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                      cx="40"
                                      cy="40"
                                      r="38"
                                      fill="none"
                                      stroke="white"
                                      strokeWidth="3"
                                      strokeDasharray="240"
                                      strokeDashoffset="60"
                                      strokeLinecap="round"
                                      className="animate-spin"
                                      style={{ animationDuration: '3s' }}
                                    />
                                  </svg>
                                )}
                              </div>

                              {/* Stars decoration for completed */}
                              {lesson.isLocked !== true && (
                                <>
                                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                    <Star className="w-4 h-4 text-white fill-white" />
                                  </div>
                                </>
                              )}
                            </Button>

                            {/* Lesson Title */}
                            <div className="mt-4 text-center">
                              <p className={`
                                text-sm font-bold px-3 py-1 rounded-full inline-block
                                ${lesson.isLocked !== true && 'text-green-700 bg-green-100'}
                           
                                ${lesson.isLocked === true && 'text-gray-500 bg-gray-100'}
                              `}>
                                {lesson.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {/* Unit Complete Treasure */}
                <div className="flex justify-center py-8">
                  <div className="relative group cursor-pointer">

                    <div className="relative bg-green-400 rounded-3xl p-6 shadow-2xl ">
                      <div className="text-6xl">🏆</div>
                    </div>
                    {/* Sparkles */}

                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
