// features/theory/types/theory.types.ts
export type TheoryType = 'grammar' | 'flashcard' | 'phrase';

export interface Pagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

// Grammar Theory
export interface GrammarTheory {
  _id: string;
  unitId: string;
  title: string;
  content: string;
  example: string;
  displayOrder: number;
  typeTheory: 'grammar';
  updatedAt: string;
  createdAt: string;
  __v: number;
}

// Flashcard Theory
export interface FlashcardTheory {
  _id: string;
  unitId: string;
  term: string;
  translation: string;
  image: string;
  audio: string;
  ipa: string;
  partOfSpeech: string;
  displayOrder: number;
  typeTheory: 'flashcard';
  updatedAt: string;
  createdAt: string;
  __v: number;
}

// Phrase Theory
export interface PhraseTheory {
  _id: string;
  unitId: string;
  phraseText: string;
  translation: string;
  displayOrder: number;
  typeTheory: 'phrase';
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export type Theory = GrammarTheory | FlashcardTheory | PhraseTheory;

export interface TheoryResponse {
  value: {
    pagination: Pagination;
    data: Theory[];
  };
}
