import { Injectable } from '@nestjs/common';
import { LoginInputDto } from './dto/input/input-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repositoy';
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository){}
  async login(temp:LoginInputDto){
    const {id,pw}=temp;

    if(!id||!pw){
      throw new Error("Invalid_Request")
    }

    let user:User;

    try{
      user = await this.userRepo.findUserById(id);
    }catch(err){
      console.log(err);
    }

    if(user===undefined) return {message:'wrong Id'}
    if(pw!==user.pw) return {message:'wrong Pw'}
    console.log(user)
    return {message:'Sucess'};
  }
}
