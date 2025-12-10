import { Button } from "@/components/ui/button"
import { useUserProgress } from "@/context/user-progress.context";
import { ROUTE } from "@/features/authentication/constants";
import { useNavigate } from "react-router-dom";

export const HomePage = ()=>{
    const navigate = useNavigate();
    const {courseId} = useUserProgress();
    if(courseId){
        navigate(ROUTE.DASHBOARD.replace(":courseId", courseId));
        return
    }
    return(
        <>
        <div className="p-10">
        <div>
            <img className="w-50 h-auto" src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/f92d5f2f7d56636846861c458c0d0b6c.svg"/>
        </div>

        <div className="flex items-center justify-center gap-10 mt-20">
            <img className="w-70 h-auto" src="https://d35aaqx5ub95lt.cloudfront.net/images/about/approach/67df77e51c20a9e953f78633e60e10aa.svg"/>
            <div className="flex flex-col gap-6">
                <h1 className="text-center text-2xl font-semibold w-100">Học ngoại ngữ miễn phí, vui nhộn và hiệu quả!</h1>
                <Button onClick={()=>navigate(ROUTE.LOGIN)} className="bg-green-400 hover:bg-green-500 text-white rounded-sm w-100 p-4 cursor-pointer">BẮT ĐẦU</Button>

            </div>
        </div>

        <div className="flex justify-center items-center gap-50 mt-20">
            <div className="w-100">
                <h1 className="text-green-400 text-[50px] font-semibold text-left">miễn phí. vui nhộn.hiệu quả</h1>
                <p>Học cùng Duolingo rất vui nhộn, <span className="text-[var(--button-login-color)]">các nghiên cứu đã chứng minh ứng dụng thật sự hiệu quả!</span> Các bài học nhỏ gọn sẽ giúp bạn ghi điểm, mở khóa cấp độ mới và luyện tập kỹ năng giao tiếp hữu dụng.</p>
            </div>
            <img className="w-80 h-auto" src="https://www.woay.vn/public/uploads/duolingo_1673325809.jpg"/>
        </div>
        </div>
        </>
    )
}