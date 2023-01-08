import { Controller, Get, Post, Body } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(private noteServer: NoteService){}

    @Post('/')
    async test(){
        return await this.noteServer.testSave();
    }

}

