import { Injectable } from '@nestjs/common';
import { LoginInputDto } from './dto/input/login-input.dto';
import { SignUpInputDto } from './dto/input/signUp-input.dto';
import { signUpUser } from './entities/sigup.entity';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repositoy';
import fs, { readFile, writeFile, writeFileSync } from 'fs';
import { existsSync, mkdirSync, readFileSync } from 'fs';




@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository){}
  getPost() {
    let dataBuffer:any
    try{
      dataBuffer=readFileSync("./src/user/userLoginInput.json",'utf-8')
    }catch(err){
      console.log(err);
      return {
        status:404,
        message:"No such file or directory"
      }
    }
    console.log(dataBuffer)
    return dataBuffer
  }
  
  async setPost(setting:LoginInputDto) {
    const {id, pw}=setting
    let dataBuffer:any
    try{
      dataBuffer=readFileSync("./src/user/userLoginInput.json",'utf-8')
    }catch(err){
      return {
        status:404,
        message: "No such file or directory"
      }
    }
    const dataJSON = dataBuffer.toString()
    const user = JSON.parse(dataJSON)

    user.id = id
    user.pw = pw
    const userJSON = JSON.stringify(user)
    const result = writeFileSync('./src/user/userLoginInput.json',userJSON)
    console.log(result)
    return result
  }

  async login(userInput:LoginInputDto){
    const {id,pw}=userInput;

    let loginUser:User;

    try{
      loginUser = await this.userRepo.findUserById(id);
    }catch(err){
      console.log(err);
    }

    if(loginUser===undefined) return {message:'wrong Id'}
    if(pw!==loginUser.pw) return {message:'wrong Pw'}
    console.log(loginUser)
    return {message:'Sucess'};
  }

  async signUp(userInput:SignUpInputDto){
    const {id,pw,email,nickname,name,age}=userInput;
    
    let isDuplicate:boolean;
    
    
    try{
      // console.log(await this.userRepo.findUserById(id))
      await this.userRepo.findUserById(id)===undefined?isDuplicate=false:isDuplicate=true;
    }catch(err){
      console.log(err);
      throw new Error("FIND_USER_BY_ID_ERROR")
    }
    
    console.log(isDuplicate)
    
    if(isDuplicate){
      return {message:"id is duplicated"}
    }
    
    let signUpUser:signUpUser = {
      id,
      pw,
      age,
      name,
      email,
      nickname
    }

    try{
      await this.userRepo.saveUser(signUpUser);
    }catch(err){
      console.log(err);
      throw new Error("SAVE_USER_ERROR")
    }

    return {message:"success"}
  }
}
