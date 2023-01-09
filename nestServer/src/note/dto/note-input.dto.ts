import {IsString } from 'class-validator';

export class NoteInputDto {
    @IsString()
    title:string;
    
    @IsString()
    content:string;
}

