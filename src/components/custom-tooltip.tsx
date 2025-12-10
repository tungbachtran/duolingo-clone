
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/features/authentication/constants";
import { useProgress } from "@/context/progress.context";
import { ProgressActionType } from "@/reducer/progress.reducer";
import { useUser } from "@/context/user.context";
import { ToastType, useToast } from "@/hooks/useToast";
import { Toast } from "./ui/toast";



interface TooltipProps {
  data: {
    _id: string;
    objective: string;
    unitId:string;
    lessonPoint:number

  };
}
export const CustomTooltip = ({ data }: TooltipProps) => {
  const navigate = useNavigate();
  const {  dispatch } = useProgress();
  const{user} = useUser();
  const { toast, showToast } = useToast();
  const onClickLesson = (id: string) => {
    dispatch({type:ProgressActionType.SET_HEART_COUNT,payload:user?.heartCount})
    dispatch({ type: ProgressActionType.SET_UNIT_ID, payload: data.unitId })
    dispatch({ type: ProgressActionType.SET_LESSON_ID, payload: data._id })
    dispatch({ type: ProgressActionType.SET_EXPERIENCE_POINT, payload: data.lessonPoint })
    if(user?.heartCount && user?.heartCount > 0){
      navigate(ROUTE.EXERCISE.replace(":lessonId", id));
    }
    else{
      showToast('Bạn không đủ số tim, vui lòng quay lại ngày mai', ToastType.ERROR);
    }
    
  };
  return (
    <>

    {toast && <Toast message={toast.message} type={toast.type} />}
      <Card className="relative bg-white shadow-md border rounded-xl">
        <CardContent>
          <div>{data.objective}</div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full cursor-pointer"
            onClick={() => onClickLesson(data._id)}
          >
            Làm bài tập
          </Button>
        </CardFooter>

        {/* Mũi tên */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 
               w-0 h-0 border-l-8 border-l-transparent 
               border-r-8 border-r-transparent 
               border-t-8 border-t-white drop-shadow-md"
        ></div>
      </Card>
    </>
  );
};
