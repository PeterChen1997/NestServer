import { Module } from '@nestjs/common';
import { ArticleModule } from 'articles/articles.module';

@Module({
  imports: [ArticleModule]
})
export class AppModule {}
