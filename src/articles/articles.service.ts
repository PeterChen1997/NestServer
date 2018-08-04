import { Injectable, Inject } from '@nestjs/common';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/creat-article.dto';
import Sequelize from 'sequelize'

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ArticlesRepository') private readonly articlesRepository: typeof Article) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = new Article();

    article.title = createArticleDto.title;
    article.id = createArticleDto.id;
    article.content = createArticleDto.content;
    article.topic = createArticleDto.topic;
    article.desc = createArticleDto.desc;

    article.id = 'article' + Date.now()

    return await article.save();
  }

  async delete(id: String) {
    const resultStatus = await this.articlesRepository.destroy({
      where: {
        id
      }
    })
    return resultStatus === 0 ? 'error' : 'success'
  }

  async update(id: String, updatedData: Object) {
    let resultStatusArr =  await this.articlesRepository.update(updatedData, {
      where: {
        id
      }
    })
    return resultStatusArr === [0] ? 'error' : 'success'
  }

  async findByPageIndex(index: number, pageSize: number) {
    return await this.articlesRepository.findAndCountAll({
      where: {}, //为空，获取全部，也可以自己添加条件
      offset: (index - 1) * pageSize, //开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
      limit: pageSize, //每页限制返回的数据条数
      order: [['createdAt', 'DESC']]
    });
  }

  async findById(id: string): Promise<Article> {
    let article = await this.articlesRepository.findOne({
      where: {
        id
      }
    });

    // view++
    this.articlesRepository.update({
      view: article.view + 1
    }, {
      where: {
        id
      }
    })

    return article
  }

  async findByArticlesType(type, index) {
    return await this.articlesRepository.findAll({
      limit: parseInt(index), //每页限制返回的数据条数
      order: [[`${type}`, 'DESC']]
    })
  }

  async searchArticlesByInfo(info, index, pageSize) {
    if(index !== '0') {
      return await this.articlesRepository.findAndCountAll({
        where: {
          [Sequelize.Op.or]: [
            {
              title: {
                [Sequelize.Op.like]: `%${info}%`
              }
            },
            {
              content: {
                [Sequelize.Op.like]: `%${info}%`
              }
            },
            {
              topic: {
                [Sequelize.Op.like]: `%${info}%`
              }
            },
            {
              createdAt: {
                [Sequelize.Op.like]: `%${info}%`
              }
            },
          ]
        },
        offset: (index - 1) * pageSize, //开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
        limit: pageSize, //每页限制返回的数据条数
        order: [['createdAt', 'DESC']]
      })
    } else {
      return {
        data: {}
      }
    }
  }

  async findAll(): Promise<Article[]> {
    return await this.articlesRepository.findAll<Article>();
  }

}