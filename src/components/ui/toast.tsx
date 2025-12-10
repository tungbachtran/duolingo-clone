// src/components/ui/toast.tsx
import { ToastType } from "@/hooks/useToast";
import { CheckCircle2, XCircle, Info } from "lucide-react";

interface ToastProps {
    message: string;
    type: ToastType;
}

export const Toast = ({ message, type }: ToastProps) => {
    const bgColor = {
        [ToastType.SUCCESS]: 'bg-green-500',
        [ToastType.ERROR]: 'bg-red-500',
        [ToastType.INFO]: 'bg-blue-500'
    }[type];

    const Icon = {
        [ToastType.SUCCESS]: CheckCircle2,
        [ToastType.ERROR]: XCircle,
        [ToastType.INFO]: Info
    }[type];

    return (
        <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top-5 z-50`}>
            <Icon className="w-5 h-5" />
            <p className="font-medium">{message}</p>
        </div>
    );
};
