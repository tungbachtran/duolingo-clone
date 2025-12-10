// src/features/services/auth.ts
import type {
  formLoginSchema,
  formRegisterSchema,
  formVerifyEmailSchema,
  formForgotPasswordSchema,
  formChangePasswordSchema,
} from "@/validation/schema";
import { apiConstant } from "../constants";
import { isAxiosError } from "axios";
import type z from "zod";

import { axiosInstance } from "../../../config/axios";

export const login = async (
  data: z.infer<typeof formLoginSchema>
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const res = await axiosInstance.post(apiConstant.LOGIN, data);
    return { success: true, message: "Đăng nhập thành công", data: res.data };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    }
    return { success: false, message: "Có lỗi xảy ra" };
  }
};

export const register = async (
  data: z.infer<typeof formRegisterSchema>
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const res = await axiosInstance.post(apiConstant.REGISTER, data);
    return { success: true, message: "Đăng ký thành công", data: res.data };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    }
    return { success: false, message: "Có lỗi xảy ra" };
  }
};

export const verifyEmail = async (
  data: z.infer<typeof formVerifyEmailSchema>
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const res = await axiosInstance.post(apiConstant.VERIFY_EMAIL, data);
    return { success: true, message: "Xác thực thành công", data: res.data };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    }
    return { success: false, message: "Có lỗi xảy ra" };
  }
};

export const resendVerificationCode = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await axiosInstance.post(apiConstant.RESEND_CODE, { email });
    return { success: true, message: "Đã gửi lại mã xác thực" };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    }
    return { success: false, message: "Có lỗi xảy ra" };
  }
};

export const forgotPassword = async (
  data: z.infer<typeof formForgotPasswordSchema>
): Promise<{ success: boolean; message: string }> => {
  try {
    await axiosInstance.post(apiConstant.FORGOT_PASSWORD, data);
    return {
      success: true,
      message: "Đã gửi mã đặt lại mật khẩu đến email của bạn",
    };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    }
    return { success: false, message: "Có lỗi xảy ra" };
  }
};

export const changePassword = async (
  data: z.infer<typeof formChangePasswordSchema>
): Promise<{ success: boolean; message: string }> => {
  try {
    await axiosInstance.post(apiConstant.CHANGE_PASSWORD, data);
    return {
      success: true,
      message: "Đã thay đổi mật khẩu thành công, vui lòng đăng nhập lại",
    };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    }
    return { success: false, message: "Có lỗi xảy ra" };
  }
};

export const resendChangePasswordCode = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await axiosInstance.post(apiConstant.RESEND_CODE, { email });
    return { success: true, message: "Đã gửi lại mã xác thực" };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    }
    return { success: false, message: "Có lỗi xảy ra" };
  }
};

export const logout = async()=>{
  await axiosInstance.post(apiConstant.LOG_OUT);
}