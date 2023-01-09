import { Injectable } from '@nestjs/common';
import { NoteInputDto } from './dto/note-input.dto';
import { Note } from './entities/note.entity';
import { NoteRepository } from './note.repo';

@Injectable()
export class NoteService {
    constructor(
        private noteRepo: NoteRepository)
    {}

    async saveNote(newNoteData:NoteInputDto){
        // const note: Note = {
        //     ...newNoteData
        // }
        // save 에 대해서
        // update 에 대해서

        try{
            await this.noteRepo.writeNote(newNoteData);
        }catch(err){
            console.log(err);
        }
    }

    async save(noteDto: NoteInputDto): Promise<NoteInputDto | undefined> {
        console.log("노트 서비스 레이어")
        return await this.noteRepo.writeNote(noteDto);
      }

}
