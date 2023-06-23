import { RawDraftContentState } from 'draft-js';

export interface IArticle {
  id: string;
  abstract: string | RawDraftContentState;
  authorId: string;
  readTime: number;
  title: string;
  headerImage: string;
  dateCreated: string;
  likes: Number;
  categories: string;
  articleBody: string | RawDraftContentState;
  views: Number;
  reviewed: boolean;
  user: {
    id: string;
    name: string;
  };
}
