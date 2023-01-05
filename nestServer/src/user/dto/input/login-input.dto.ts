import {IsString } from 'class-validator';

export class LoginInputDto {
    @IsString()
    id:string;
    
    @IsString()
    pw:string;
}

