import { Sequelize } from 'sequelize-typescript';
import { Article } from 'articles/article.entity';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize({
        operatorsAliases: false,
        dialect: 'mysql',
        host: '119.28.82.24',
        port: 3306,
        username: 'peterchen',
        password: 'admin',
        database: 'peterchen',
        pool: {
          max: 5, // 连接池中最大连接数量
          min: 0, // 连接池中最小连接数量
          idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
        }
      });
      sequelize.addModels([Article]);
      await sequelize.sync({
        // force: true
      });
      return sequelize;
    },
  },
];