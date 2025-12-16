
export const LOGIN_FORM_TITLE = {
    USERNAME:'Email',
    PASSWORD:'Mật khẩu',
    LOGIN:'Đăng nhập',
    PLACE_HOLDER_USERNAME:'Nhập email của bạn',
    PLACE_HOLDER_PASSWORD:'Nhập mật khẩu',
    HEADER:'Đăng nhập tài khoản',
    FORGOT_PASSWORD:'Quên mật khẩu?',
    NO_ACCOUNT:"Chưa có tài khoản? ",
    CREATE_ACCOUNT:'Tạo tài khoản'
}

export const REGISTER_FORM_TITLE = {
    EMAIL:'Email',
    PASSWORD:'Mật khẩu',
    FULL_NAME:'Họ và tên',
    REGISTER:'Đăng ký',
    PLACE_HOLDER_EMAIL:'Nhập email của bạn',
    PLACE_HOLDER_PASSWORD:'Nhập mật khẩu',
    PLACE_HOLDER_FULL_NAME:'Nhập họ và tên',
    HEADER:'Tạo tài khoản mới',
    HAVE_ACCOUNT:"Đã có tài khoản? ",
    LOGIN:'Đăng nhập'
}

export const VERIFY_EMAIL_TITLE = {
    HEADER:'Xác thực email',
    DESCRIPTION:'Chúng tôi đã gửi mã xác thực đến email',
    CODE:'Mã xác thực',
    PLACE_HOLDER_CODE:'Nhập mã 6 số',
    VERIFY:'Xác thực',
    RESEND:'Gửi lại mã',
    RESEND_COUNTDOWN:'Gửi lại sau',
    BACK_TO_REGISTER:'Quay lại đăng ký'
}

export const FORGOT_PASSWORD_TITLE = {
    HEADER:'Quên mật khẩu',
    DESCRIPTION:'Nhập email của bạn để nhận mã đặt lại mật khẩu',
    EMAIL:'Email',
    PLACE_HOLDER_EMAIL:'Nhập email của bạn',
    SUBMIT:'Gửi mã',
    BACK_TO_LOGIN:'Quay lại đăng nhập'
}

export const CHANGE_PASSWORD_TITLE = {
    HEADER:'Đổi mật khẩu',
    DESCRIPTION:'Nhập code đã gửi đến email của bạn để đặt lại mật khẩu',
    CODE:'Code',
    NEW_PASSWORD:"Mật khẩu mới",
    PLACE_HOLDER_PASSWORD:"Nhập mật khẩu mới",
    PLACE_HOLDER_CODE:'Nhập mã code',
    SUBMIT:'Thay đổi mật khẩu',
    BACK_TO_LOGIN:'Quay lại đăng nhập'
}

export const apiConstant = {
    LOGIN:'/api/auth/login',
    REGISTER:'/api/auth/register',
    VERIFY_EMAIL:'/api/auth/verify-email',
    RESEND_CODE:'/api/auth/resend-verification-code',
    FORGOT_PASSWORD:'/api/auth/forgot-password',
    CHANGE_PASSWORD:'/api/auth/change-password',
    PROFILE:'/api/auth/profile',
    LOG_OUT:'/api/auth/logout',
    COURSE: {
        GET_UNIT_AND_LESSON : (courseId:string) => `/api/progress/units/${courseId}`,
        GET_UNIT_AND_LESSON_NOT_LOCKED : (courseId:string) => `/api/units/user/${courseId}`,
    },
    EXERCISE:{
        GET_LESSON_EXERCISES : (lessonId:string) => `/api/questions/user/${lessonId}`
    },
    THEORIES:{
        GET_THEORIES:(unitId:string) => `/api/theories/user/${unitId}`
    },

    USER:{
        GET_USER_INFO : `/api/auth/profile`
    },

    PROGRESS:{
        UPDATE_USER_PROGRESS:`/api/progress`
    },
    MISTAKE:{
        POST_USER_MISTAKE:`/api/mistakes`
    },
    LEADERBOARD:{
        GET_LEADERBOARD:`/api/rankings/exp`
    }
}

export const ROUTE = {
    HOME:'/',
    LOGIN:'/login',
    REGISTER:'/register',
    VERIFY_EMAIL:'/verify-email',
    FORGOT_PASSWORD:'/forgot-password',
    DASHBOARD:'/dashboard',
    CHANGE_PASWORD:'/change-password',
    COURSE:'/course',
    EXERCISE:'/lesson/:lessonId/exercises',
    UNIT_LIST:'/course/:courseId/units',
    UNIT_THEORIES:'/unit/:unitId/theories',
    MISTAKE:'/user/mistakes',
    LEADERBOARD:'/leaderboard',
    PROFILE:'/profile'
}