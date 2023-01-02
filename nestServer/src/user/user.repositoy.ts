import { Injectable } from '@nestjs/common';

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
    
}