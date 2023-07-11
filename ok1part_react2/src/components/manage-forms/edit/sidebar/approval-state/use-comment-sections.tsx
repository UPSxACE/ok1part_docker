import { useState } from 'react';

export interface IComment {
  id: string;
  userId: number;
  date: Date;
  message: string;
  status: number;
}
export interface ICommentSection {
  id: string;
  userId: number;
  status: number;
  comments: IComment[];
}

export interface ICommentsState {
  commentSections: ICommentSection[];
  setCommentSections: React.Dispatch<React.SetStateAction<ICommentSection[]>>;
}

export default function useCommentSections(commentsState: ICommentsState) {
  const { commentSections, setCommentSections } = commentsState;

  const [textfieldValue, setTextfieldValue] = useState<string>('');

  return {
    textfieldValue,
    setTextfieldValue,
    commentSections,
    setCommentSections,
  };
}
