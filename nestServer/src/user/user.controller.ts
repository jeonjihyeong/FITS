import { Controller, Post, Body} from '@nestjs/common';
import { LoginInputDto } from './dto/input/login-input.dto';
import { SignUpInputDto } from './dto/input/signUp-input.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post('/login')
  async LogIn(@Body() loginUserData: LoginInputDto){
    return await this.userService.login(loginUserData);
  }

  @Post('signUp')
  async SignUp(@Body() signUpuserData:SignUpInputDto){
    return await this.userService.signUp(signUpuserData);
  }
}
