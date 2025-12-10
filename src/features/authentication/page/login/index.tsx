// src/features/authentication/pages/LoginPage.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { formLoginSchema } from "@/validation/schema";
import type z from "zod";
import { login } from "@/features/authentication/services/auth";
import { useToast, ToastType } from "@/hooks/useToast";
import { Toast } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { LOGIN_FORM_TITLE, ROUTE } from "../../constants";
import { GoogleLoginButton } from "@/components/auth/google-login-button";

export const LoginPage = () => {
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    const res = await login(values);
    
    if (res.success) {
      showToast(res.message, ToastType.SUCCESS);
      // Redirect to dashboard or home
      setTimeout(() => {
        navigate(ROUTE.COURSE);
      }, 1000);
    } else {
      showToast(res.message, ToastType.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {toast && <Toast message={toast.message} type={toast.type} />}
      
      <div className="w-full max-w-md">
       
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              {LOGIN_FORM_TITLE.HEADER}
            </h1>
            <p className="text-gray-500">Chào mừng bạn quay trở lại!</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      {LOGIN_FORM_TITLE.USERNAME}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder={LOGIN_FORM_TITLE.PLACE_HOLDER_USERNAME}
                          {...field}
                          className="pl-11 h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <FormLabel className="text-gray-700 font-semibold">
                        {LOGIN_FORM_TITLE.PASSWORD}
                      </FormLabel>
                      <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-xs text-blue-600 hover:text-blue-700 font-semibold underline"
                      >
                        {LOGIN_FORM_TITLE.FORGOT_PASSWORD}
                      </button>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder={LOGIN_FORM_TITLE.PLACE_HOLDER_PASSWORD}
                          {...field}
                          className="pl-11 h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-[var(--button-login-color)] hover:bg-var(--button-login-color-hover) text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
              >
                {LOGIN_FORM_TITLE.LOGIN}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              {LOGIN_FORM_TITLE.NO_ACCOUNT}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-600 font-semibold hover:text-blue-700 underline ml-1"
              >
                {LOGIN_FORM_TITLE.CREATE_ACCOUNT}
              </button>
            </p>
          </div>

          <div>
          <GoogleLoginButton/>
          </div>
      </div>
    </div>
  );
};
