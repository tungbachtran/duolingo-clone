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

import {
  formChangePasswordSchema,
} from "@/validation/schema";
import type z from "zod";
import {

  changePassword,
} from "@/features/authentication/services/auth";
import { useToast, ToastType } from "@/hooks/useToast";
import { Toast } from "@/components/ui/toast";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { CHANGE_PASSWORD_TITLE } from "../../constants";

export const ChangePasswordPage = () => {
  const { toast, showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email: string = location.state?.email || "";

  const form = useForm<z.infer<typeof formChangePasswordSchema>>({
    resolver: zodResolver(formChangePasswordSchema),
    defaultValues: {
      email: email,
      code: "",
      newPassword: "",
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof formChangePasswordSchema>
  ) => {
    const res = await changePassword(values);

    if (res.success) {
      showToast(res.message, ToastType.SUCCESS);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      showToast(res.message, ToastType.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="w-full max-w-md">

        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">
            {CHANGE_PASSWORD_TITLE.HEADER}
          </h1>
          <p className="text-gray-600">{CHANGE_PASSWORD_TITLE.DESCRIPTION}</p>
          <p className="text-blue-600 font-semibold">{email}</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    {CHANGE_PASSWORD_TITLE.CODE}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={CHANGE_PASSWORD_TITLE.PLACE_HOLDER_CODE}
                      {...field}
                      maxLength={6}
                      className="h-14 text-center text-2xl font-bold tracking-widest rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    {CHANGE_PASSWORD_TITLE.NEW_PASSWORD}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={CHANGE_PASSWORD_TITLE.PLACE_HOLDER_PASSWORD}
                      type="password"
                      {...field}
                      maxLength={50}
                      className="h-14  font-bold tracking-widest rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-green-400 hover:bg-[var(--button-login-color)] cursor-pointer text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              {CHANGE_PASSWORD_TITLE.SUBMIT}
            </Button>


          </form>
        </Form>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-600 hover:text-gray-800 font-semibold flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            {CHANGE_PASSWORD_TITLE.BACK_TO_LOGIN}
          </button>
        </div>
      </div>
    </div>
  );
};
