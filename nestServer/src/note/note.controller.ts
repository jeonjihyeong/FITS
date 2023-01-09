import { Controller, Get, Post, Body } from '@nestjs/common';
import { NoteInputDto } from './dto/note-input.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService){}

    @Post('/')
    async write(@Body() newNoteData:NoteInputDto){
        try{
            this.noteService.saveNote(newNoteData)
        }catch(err){
            console.log(err)
        }
    }

}

