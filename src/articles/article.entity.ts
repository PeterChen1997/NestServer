import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Article extends Model<Article> {
  @Column({ primaryKey: true })
  id: string;
  
  @Column({
    type: DataType.TEXT
  })
  content: string;
  
  @Column title: string;
  @Column topic: string;
  @Column desc: string;
  @Column view: number;

  @Column
  @CreatedAt
  createdAt: Date;

  @Column
  @UpdatedAt
  updatedAt: Date;

}