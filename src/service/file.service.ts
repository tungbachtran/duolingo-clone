import {axiosInstance} from '@/config/axios';

export interface UploadResponse {
  url: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axiosInstance.post('/api/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
