import { Controller, Get, Post, Param, Body, Delete, Patch } from '@nestjs/common';
import { CreateArticleDto } from './dto/creat-article.dto';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService:ArticlesService) {}

    @Post()
    async create(@Body() createArticletDto: CreateArticleDto) {
        return await this.articlesService.create(createArticletDto);
    }

    @Delete('/:id')
    async delete(@Param() params) {
        return await this.articlesService.delete(params.id)
    }

    @Patch('/:id')
    async update(@Param() params, @Body() updateData: Object) {
        return await this.articlesService.update(params.id, updateData)
    }

    @Get('/tags')
    async findAllArticlesTag() {
        let articles =  await this.articlesService.findAll()
        let resultArr = articles.reduce((arr, article) => {
            article.topic.split("-").map(tag => {
              if(arr.indexOf(tag) === -1) {
                arr.push(tag)
              }
            })
            return arr
          }, [])
          return resultArr
    }

    @Get('/page/:index')
    async findByPageIndex(@Param() params) {
        const pageSize = 5
        return await this.articlesService.findByPageIndex(params.index, pageSize)
    }

    
    @Get('/:id')
    async findById(@Param() params): Promise<Article> {
        return await this.articlesService.findById(params.id)
    }
    
    @Get('/:type/:index')
    async findByArticlesType(@Param() params) {
        return await this.articlesService.findByArticlesType(params.type, params.index)
    }

    @Get('/search/:info/:index')
    async searchArticlesByInfo(@Param() params) {
        const pageSize = 5
        return await this.articlesService.searchArticlesByInfo(params.info, params.index, pageSize)
    }
    
    @Get('/')
    async findAll(): Promise<Article[]> {
        return await this.articlesService.findAll()
    }

}
