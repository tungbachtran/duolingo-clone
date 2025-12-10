// src/hooks/useToast.ts
import { useState, useEffect } from "react"

export enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
}

export const useToast = () => {
    const [toast, setToast] = useState<{message: string, type: ToastType} | null>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message: string, type: ToastType = ToastType.INFO) => {
        setToast({ message, type });
    };

    return { toast, showToast };
}
