import {IsNotEmpty, IsString } from 'class-validator';

export class NoteInputDto {
    @IsString()
    @IsNotEmpty()
    title:string;

    
    @IsString()
    @IsNotEmpty()
    content:string;
}

