import { IsString, IsNumber} from "class-validator";

export class UserOutputDto{
    @IsString()
    id:string;

    @IsString()
    pw:string;

    @IsNumber()
    age:number;
    
    @IsString()
    name:string;

    @IsString()
    nickname:string;

    @IsString()
    email:string;
}