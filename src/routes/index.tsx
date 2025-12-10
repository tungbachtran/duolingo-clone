import { ROUTE } from "@/features/authentication/constants"
import { ChangePasswordPage } from "@/features/authentication/page/change-password"
import { ForgotPasswordPage } from "@/features/authentication/page/forgot-password"
import { LoginPage } from "@/features/authentication/page/login"
import { RegisterPage } from "@/features/authentication/page/register"
import { VerifyEmailPage } from "@/features/authentication/page/verify-email"
import { CoursePage } from "@/features/course/page"
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page"


import LessonExercises from "@/features/exercise/pages/lesson-exercises"
import { HomePage } from "@/features/home/page/home-page"
import ProfilePage from "@/features/profile/page/profile"
import LeaderboardPage from "@/features/ranking/page/ranking-page"
import UnitList from "@/features/theory/pages/unit-list"
import UnitTheories from "@/features/theory/pages/unit-theories"
import UserMistakesPage from "@/wrong-answer/pages"
import { useRoutes } from "react-router-dom"

export const IndexRoutes = ()=>{
    const routes = useRoutes([
        {
            path: ROUTE.HOME,
            element:<HomePage/>
        },
        {
            path: ROUTE.LOGIN,
            element:<LoginPage/>
        },
        {
            path: ROUTE.REGISTER,
            element:<RegisterPage/>
        },
        {
            path: ROUTE.VERIFY_EMAIL,
            element:<VerifyEmailPage/>
        },
        {
            path: ROUTE.FORGOT_PASSWORD,
            element:<ForgotPasswordPage/>
        },
        {
            path: ROUTE.CHANGE_PASWORD,
            element:<ChangePasswordPage/>
        },
        {
            path: ROUTE.DASHBOARD,
            element:<DashboardPage/>
        },

        {
            path: ROUTE.COURSE,
            element:<CoursePage/>
        },

        {
            path: ROUTE.EXERCISE,
            element:<LessonExercises/>
        },

        {
            path: ROUTE.UNIT_LIST,
            element:<UnitList/>
        },

        {
            path: ROUTE.UNIT_THEORIES,
            element:<UnitTheories/>
        },
        {
            path: ROUTE.MISTAKE,
            element:<UserMistakesPage/>
        },
        {
            path: ROUTE.LEADERBOARD,
            element:<LeaderboardPage/>
        },
        {
            path: ROUTE.PROFILE,
            element:<ProfilePage/>
        }

    ])

    return routes
}