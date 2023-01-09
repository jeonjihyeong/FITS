import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('increment')
  noteIdx?: number;

  @Column()
  title: string;
  
  @Column()
  content: string;

}