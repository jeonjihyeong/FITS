import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note)
        private noteRepo: Repository<Note>)
    {}

    async testSave() {
        const note: Note = {
            name: "aaa",
            noteIdx: 9
        }
        // save 에 대해서
        // update 에 대해서

        return await this.noteRepo.save(note);
    }

}
