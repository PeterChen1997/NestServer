import { Article } from './article.entity';

export const articlesProviders = [
  {
    provide: 'ArticlesRepository',
    useValue: Article,
  },
];