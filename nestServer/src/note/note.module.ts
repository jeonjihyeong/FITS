import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteRepository } from './note.repo';
import { TypeOrmExModule } from 'src/db/typeorm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';

@Module({
  imports : [
    // TypeOrmModule.forFeature([Note]),
    TypeOrmModule.forFeature([Note])
    // TypeOrmExModule.forCustomRepository([NoteRepository])
  ],
  // exports:[TypeOrmModule],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
