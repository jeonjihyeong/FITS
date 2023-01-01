import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InputUser } from './dto/input/input-user.dto';

import { UserService } from './user.service';



class User {
  id: string
  pw: string
  age?: number
  nickname?: string  
}


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post('/login')
  test(@Body() temp: InputUser){
    
    const user: User = new User();
    user.age = 1
    user.id = 'aa'

    const testUser: User=  {
      id : 'aa',
      pw: "d"
    }
    // rePo.save(user);

    const result = this.userService.testUserService(temp.id, temp.pw);
    console.log(result);

  }
}
