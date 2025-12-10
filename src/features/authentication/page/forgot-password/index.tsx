
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
import { FORGOT_PASSWORD_TITLE } from "../../constants";
import { formForgotPasswordSchema } from "@/validation/schema";
import type z from "zod";
import { forgotPassword } from "@/features/authentication/services/auth";
import { useToast, ToastType } from "@/hooks/useToast";
import { Toast } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

export const ForgotPasswordPage = () => {
  const { toast, showToast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formForgotPasswordSchema>>({
    resolver: zodResolver(formForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formForgotPasswordSchema>) => {
    const res = await forgotPassword(values);
    
    if (res.success) {
      showToast(res.message, ToastType.SUCCESS);
      setTimeout(() => {
        navigate('/change-password' , { state: { email: values.email } });
      }, 500);
    } else {
      showToast(res.message, ToastType.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {toast && <Toast message={toast.message} type={toast.type} />}
      
      <div className="w-full max-w-md">
        
          {/* Header */}
          <div className="text-center space-y-3">
            
            <h1 className="text-3xl font-bold text-gray-800">
              {FORGOT_PASSWORD_TITLE.HEADER}
            </h1>
            <p className="text-gray-600">
              {FORGOT_PASSWORD_TITLE.DESCRIPTION}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold mt-10">
                      {FORGOT_PASSWORD_TITLE.EMAIL}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder={FORGOT_PASSWORD_TITLE.PLACE_HOLDER_EMAIL}
                          {...field}
                          className="pl-11 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-500 transition-colors"
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
                className="w-full h-12 bg-[var(--button-login-color)] hover:bg-[var(--button-login-color)] cursor-pointer text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                {FORGOT_PASSWORD_TITLE.SUBMIT}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-800 font-semibold flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              {FORGOT_PASSWORD_TITLE.BACK_TO_LOGIN}
            </button>
          </div>
      </div>
    </div>
  );
};
