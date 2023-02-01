import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  userIdx: number;

  @Column()
  id: string;
  
  @Column()
  pw: string;
  
  @Column()
  email: string;
  
  @Column()
  age: number;
  
  @Column()
  name: string;

  @Column()
  nickname: string;
}