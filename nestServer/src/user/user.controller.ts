import { Controller, Post, Body} from '@nestjs/common';
import { LoginInputDto } from './dto/input/input-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post('/login')
  async LogIn(@Body() userData: LoginInputDto){
    return await this.userService.login(userData);
  }
}
