
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

import { formRegisterSchema } from "@/validation/schema";
import type z from "zod";
import { register } from "@/features/authentication/services/auth";
import { useToast, ToastType } from "@/hooks/useToast";
import { Toast } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { REGISTER_FORM_TITLE } from "../../constants";

export const RegisterPage = () => {
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formRegisterSchema>) => {
    const res = await register(values);

    if (res.success) {
      showToast(res.message, ToastType.SUCCESS);

      setTimeout(() => {
        navigate('/verify-email', { state: { email: values.email } });
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

          <h1 className="text-3xl font-bold text-gray-800">
            {REGISTER_FORM_TITLE.HEADER}
          </h1>
          <p className="text-gray-500">Bắt đầu hành trình học tập của bạn</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    {REGISTER_FORM_TITLE.FULL_NAME}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder={REGISTER_FORM_TITLE.PLACE_HOLDER_FULL_NAME}
                        {...field}
                        className="pl-11 h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    {REGISTER_FORM_TITLE.EMAIL}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder={REGISTER_FORM_TITLE.PLACE_HOLDER_EMAIL}
                        {...field}
                        className="pl-11 h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    {REGISTER_FORM_TITLE.PASSWORD}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder={REGISTER_FORM_TITLE.PLACE_HOLDER_PASSWORD}
                        {...field}
                        className="pl-11 h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />


            <Button
              type="submit"
              className="w-full h-12 bg-green-400 hover:bg-[var(--button-login-color)] cursor-pointer text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              {REGISTER_FORM_TITLE.REGISTER}
            </Button>
          </form>
        </Form>


        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            {REGISTER_FORM_TITLE.HAVE_ACCOUNT}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 font-semibold hover:text-blue-700 underline ml-1"
            >
              {REGISTER_FORM_TITLE.LOGIN}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
