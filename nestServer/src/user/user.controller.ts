import { Controller, Post, Body, Get} from '@nestjs/common';
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

  @Post('/signUp')
  async SignUp(@Body() signUpuserData:SignUpInputDto){
    return await this.userService.signUp(signUpuserData);
  }
  // @Post('/signUpMail')
  // async SignUp(@Body() signUpuserData:SignUpInputDto){
  //   return await this.userService.signUp(signUpuserData);
  // }
  // @Post('/findId')
  // async SignUp(@Body() signUpuserData:SignUpInputDto){
  //   return await this.userService.signUp(signUpuserData);
  // }
  // @Post('/findPw')
  // async SignUp(@Body() signUpuserData:SignUpInputDto){
  //   return await this.userService.signUp(signUpuserData);
  // }
  // @Post('/changePw')
  // async SignUp(@Body() signUpuserData:SignUpInputDto){
  //   return await this.userService.signUp(signUpuserData);
  // }





  @Get('/setting')
  async getSetting(){
    return await this.userService.getSetting()
    // setting data 가져오기 
  }
  @Post('/setting')
  async postSetting(@Body() data: any){
    return this.userService.setPost(data)
    
    /*
    postSetting을 하게 되면 setting.json 파일을 생성하기
      data = {
        name : ,
        age : ,
      }
    */
  }
}
