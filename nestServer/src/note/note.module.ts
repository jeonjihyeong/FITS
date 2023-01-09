import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteRepository } from './note.repo';
import { TypeOrmExModule } from 'src/db/typeorm-module';

@Module({
  imports : [TypeOrmExModule.forCustomRepository([NoteRepository])],
  providers: [NoteService],
  controllers: [NoteController]
})
export class NoteModule {}
