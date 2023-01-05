import { Injectable } from '@nestjs/common';
import { signUpUser } from './entities/sigup.entity';

@Injectable()
export class UserRepository{
    async findUserById(id:string){
        let res = {
            id:'kkk',
            pw:'kkk'
        }
        if(id!==res.id){
            return
        }
        return res
    }
    async saveUser(signUpUser:signUpUser){
        console.log(signUpUser)
        return true
    }
}