import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteInputDto } from './dto/note-input.dto';
import { Note } from './entities/note.entity';
import { NoteRepository } from './note.repo';


interface test {
    title: string
    content: string
    name: string
}

class Human {
    name: string
    constructor (name: string){
        this.name = name;
    }
}

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note)
        private noteRepo: Repository<Note>)
    {}

    async saveNote({title, content}){
        this.noteRepo.save(newNoteData)
        return {data:"suc"}
    }


    // const note: Note = {
    //     ...newNoteData
    // }
    // save 에 대해서
    // update 에 대해서

    // try{
    //     await this.noteRepo.writeNote(newNoteData);
    // }catch(err){
    //     console.log(err);
    // }
    
    // async save(noteDto: NoteInputDto): Promise<NoteInputDto | undefined> {
    //     console.log("노트 서비스 레이어")
    //     return await this.noteRepo.writeNote(noteDto);
    //   }

}
