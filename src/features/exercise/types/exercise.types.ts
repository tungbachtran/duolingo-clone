// types/exercise.types.ts
export type QuestionType = 'multiple_choice' | 'ordering' | 'matching' | 'gap';

export interface MultipleChoiceQuestion {
  _id: string;
  lessonId: string;
  correctAnswer: string;
  answers: string[];
  mediaUrl: string;
  displayOrder: number;
  typeQuestion: 'multiple_choice';
  title:string
}

export interface OrderingQuestion {
  _id: string;
  lessonId: string;
  fragmentText: string[];
  exactFragmentText: string;
  displayOrder: number;
  typeQuestion: 'ordering';
}

export interface MatchingPair {
  value: string;
  pairId: string;
}

export interface MatchingQuestion {
  _id: string;
  lessonId: string;
  leftText: MatchingPair[];
  rightText: MatchingPair[];
  displayOrder: number;
  typeQuestion: 'matching';
}

export interface GapQuestion {
  _id: string;
  lessonId: string;
  correctAnswer: string;
  mediaUrl: string;
  displayOrder: number;
  typeQuestion: 'gap';
}

export type Exercise = MultipleChoiceQuestion | OrderingQuestion | MatchingQuestion | GapQuestion;

// Type cho các answer
export type MultipleChoiceAnswer = string;
export type OrderingAnswer = string[];
export interface MatchingAnswer {
  leftId: string;
  rightId: string;
}
export type GapAnswer = string;

export type Answer = MultipleChoiceAnswer | OrderingAnswer | MatchingAnswer[] | GapAnswer;

export interface UserAnswer {
  questionId: string;
  answer: Answer;
  isCorrect: boolean;
  timeSpent: number;
}

export interface ExerciseResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectQuestions: Exercise[];
  totalTime: number;
  userAnswers: UserAnswer[];
}
