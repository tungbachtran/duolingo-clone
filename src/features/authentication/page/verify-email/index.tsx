
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

import { formVerifyEmailSchema } from "@/validation/schema";
import type z from "zod";
import { verifyEmail, resendVerificationCode } from "@/features/authentication/services/auth";
import { useToast, ToastType } from "@/hooks/useToast";
import { Toast } from "@/components/ui/toast";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { VERIFY_EMAIL_TITLE } from "../../constants";

export const VerifyEmailPage = () => {
  const { toast, showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate('/register');
      return;
    }


    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          showToast('Hết thời gian xác thực. Vui lòng đăng ký lại.', ToastType.ERROR);
          setTimeout(() => navigate('/register'), 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  useEffect(() => {

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const form = useForm<z.infer<typeof formVerifyEmailSchema>>({
    resolver: zodResolver(formVerifyEmailSchema),
    defaultValues: {
      email: email,
      code: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formVerifyEmailSchema>) => {
    const res = await verifyEmail(values);

    if (res.success) {
      showToast(res.message, ToastType.SUCCESS);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      showToast(res.message, ToastType.ERROR);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    const res = await resendVerificationCode(email);

    if (res.success) {
      showToast(res.message, ToastType.SUCCESS);
      setCountdown(60);
      setCanResend(false);
      setTimeLeft(60);
    } else {
      showToast(res.message, ToastType.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="w-full max-w-md">


        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-gradient-to-br  rounded-full mx-auto flex items-center justify-center">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {VERIFY_EMAIL_TITLE.HEADER}
          </h1>
          <p className="text-gray-600">
            {VERIFY_EMAIL_TITLE.DESCRIPTION}
          </p>
          <p className="text-blue-600 font-semibold">{email}</p>


          <div className="bg-green-400 border-2  rounded-xl p-3">
            <p className="text-white font-semibold">
              Thời gian còn lại: <span className="text-xl">{timeLeft}s</span>
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    {VERIFY_EMAIL_TITLE.CODE}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={VERIFY_EMAIL_TITLE.PLACE_HOLDER_CODE}
                      {...field}
                      maxLength={6}
                      className="h-14 text-center text-2xl font-bold tracking-widest rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />


            <Button
              type="submit"
              className="w-full h-12 bg-green-400 hover:bg-green-500 cursor-pointer text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              {VERIFY_EMAIL_TITLE.VERIFY}
            </Button>


            <Button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`w-full h-12 rounded-xl font-semibold transition-all duration-200 ${canResend
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${canResend ? '' : 'opacity-50'}`} />
              {canResend
                ? VERIFY_EMAIL_TITLE.RESEND
                : `${VERIFY_EMAIL_TITLE.RESEND_COUNTDOWN} ${countdown}s`}
            </Button>
          </form>
        </Form>

        <div className="text-center pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/register')}
            className="text-gray-600 hover:text-gray-800 font-semibold flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            {VERIFY_EMAIL_TITLE.BACK_TO_REGISTER}
          </button>
        </div>

      </div>
    </div>
  );
};
