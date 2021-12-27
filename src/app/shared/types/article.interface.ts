import {ProfileInterface} from 'src/app/shared/types/profile.interface';

export class ArticleInterface {
  author: ProfileInterface;
  body: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
}
