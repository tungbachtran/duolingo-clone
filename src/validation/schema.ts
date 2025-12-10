// src/validation/schema.ts
import { z } from "zod"

export const formLoginSchema = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}).min(2, {message:'Email phải có ít nhất 2 ký tự'}).max(50),
    password: z.string().min(6,{message:'Mật khẩu phải có ít nhất 6 ký tự'}).max(50)
})

export const formRegisterSchema = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}),
    password: z.string().min(6,{message:'Mật khẩu phải có ít nhất 6 ký tự'}).max(50),
    fullName: z.string().min(2, {message:'Họ tên phải có ít nhất 2 ký tự'}).max(100),
})

export const formVerifyEmailSchema = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}),
    code: z.string().length(6, {message: 'Mã xác thực phải có 6 ký tự'})
})

export const formForgotPasswordSchema = z.object({
    email: z.string().email({message: 'Email không hợp lệ'})
})

export const formChangePasswordSchema = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}),
    code: z.string().length(6, {message: 'Mã xác thực phải có 6 ký tự'}),
    newPassword: z.string().min(6,{message:'Mật khẩu phải có ít nhất 6 ký tự'}).max(50),
})