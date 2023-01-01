import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  testUserService(id: string, pw: string){
    return id + pw;
  }

}
