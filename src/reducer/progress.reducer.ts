import type { UpdateUserProgressForm } from "@/features/dashboard/services";

export const initialProgressState: UpdateUserProgressForm = {
  lessonId: "",
  unitId: "",
  courseId: "",
  experiencePoint: 0,
  heartCount: 0,
};

export enum ProgressActionType {
  SET_LESSON_ID = "SET_LESSON_ID",
  SET_UNIT_ID = "SET_UNIT_ID",
  SET_EXPERIENCE_POINT = "SET_EXPERIENCE_POINT",
  SET_HEART_COUNT = "SET_HEART_COUNT",
  SET_COURSE_ID = "SET_COURSE_ID",
  RESET = "RESET",
}

export type ProgressAction =
  | { type: ProgressActionType.SET_LESSON_ID; payload: string }
  | { type: ProgressActionType.SET_UNIT_ID; payload: string }
  | { type: ProgressActionType.SET_EXPERIENCE_POINT; payload: number }
  | { type: ProgressActionType.SET_HEART_COUNT; payload?: number }
  | { type: ProgressActionType.SET_COURSE_ID; payload?: string }
  | { type: ProgressActionType.RESET };

export const progressReducer = (
  state: UpdateUserProgressForm,
  action: ProgressAction
): UpdateUserProgressForm => {
  switch (action.type) {
    case ProgressActionType.SET_LESSON_ID:
      return { ...state, lessonId: action.payload };
    case ProgressActionType.SET_UNIT_ID:
      return { ...state, unitId: action.payload };
    case ProgressActionType.SET_EXPERIENCE_POINT:
      return { ...state, experiencePoint: action.payload };
    case ProgressActionType.SET_HEART_COUNT:
      return { ...state, heartCount: action.payload };
      case ProgressActionType.SET_COURSE_ID:
      return { ...state, courseId: action.payload };
    case ProgressActionType.RESET:
      return { ...initialProgressState };
    default:
      return state;
  }
};
