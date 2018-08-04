export class CreateArticleDto {
    id: string;
    readonly title: string;
    readonly topic: string;
    readonly desc: string;
    readonly content: string;
  }