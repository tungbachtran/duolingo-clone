// features/theory/services/index.ts

import { apiConstant } from "@/features/authentication/constants";
import { axiosInstance } from "../../../config/axios";
import type { TheoryResponse, Theory } from '../types/theory.types';

export const getUnitTheories = async (unitId: string): Promise<Theory[]> => {
  const res = await axiosInstance.get<TheoryResponse>(
    apiConstant.THEORIES.GET_THEORIES(unitId),
    {
      withCredentials: true,
    }
  );
  return res.data.value.data;
};
