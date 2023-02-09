import { Injectable } from '@nestjs/common';
import { LoginInputDto } from './dto/input/login-input.dto';
import { SignUpInputDto } from './dto/input/signUp-input.dto';
import { signUpUser } from './entities/sigup.entity';
import { User } from './entities/user.entity';
import fs, { readFile, unlink, unlinkSync, writeFile, writeFileSync } from 'fs';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOutputDto } from './dto/output/user-output.dto';




@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>)
{}
  /* 세팅값을 받아옴 없으면 만들기?
  세팅값을 불러올때 에러 json파일 형식이 아니라면? 근데 경로지정해서 그럴일 없음
  json 파일 값을 특정값을 검색하면 그에 대한 리턴을 해주는 메소드(별론거 같아서 했다가 걍 지움)
  이걸 대체 왜 만드는지를 몰라서 어떤식으로 구현을 해야하는지를 이해를 못하겠음 (목적을 모르겠어서)
  json 형식에 대한 이해 */

  getSetting() {
    let dataBuffer:any
    try{
      dataBuffer=readFileSync("./src/user/userLoginInput4.json",'utf-8')
    }catch(err){
      writeFileSync('./src/user/userLoginInput4.json',"{}")
      dataBuffer=readFileSync("./src/user/userLoginInput4.json",'utf-8')
    }
    console.log(dataBuffer)
    return dataBuffer
  }
  
  /*세팅값을 요청하면 그 값을 파일로 만든다. 
  추가적인 기능? 구현없이 에러만 처리 하는 방법?
  예상 에러 
  1.정상값이 안들어왔을때
  2.파일 형식에 이상이 있을때 -해당파일을 삭제하고 같은 이름의 새로운 파일을 생성하고 재귀를 돌림(데이터가 깨져있으니까)
  3.지정된 id와 pw 말고 다른값이 추가로 들어올때도 json 으로 생성을 하고 싶음
  4.해당 파일이 없을때 - 새로 생성하고 거기에 담아준다.
  5.비동기 에러
  6.
  */ 
  setPost(setting:LoginInputDto) {
    let dataBuffer:any
    const file = "./src/user/userLoginInput3.json"
    try{
      dataBuffer=readFileSync(file,'utf-8')
    }catch(err){
      writeFileSync(file,"{}")
    }
    console.log(dataBuffer)
    const dataJSON = dataBuffer.toString()
    console.log(1)
    try{
      const userJson = JSON.parse(dataJSON)
      userJson.setting = setting
      const user = JSON.stringify(userJson)
      writeFileSync(file,user)
    }catch(err){
      console.log(err)
      unlinkSync(file)
      writeFileSync(file,"{}")
      console.log('지우고 새로 한번 더 ㄱㄱ')
      this.setPost(setting)
    }
    
    return ({data:'success'})
  }

  async login(userInput:LoginInputDto){
    const {id,pw}=userInput;

    let checkLogin : UserOutputDto|string

    try{
      checkLogin = await this._checkExistence(id,pw)
    }catch(err){
      console.log(err);
    }
    console.log(checkLogin)
    if (<string>checkLogin){
      return {message:checkLogin}
    }

    await this._signNewAccessAndRefreshToken(<UserOutputDto>checkLogin)
    console.log(checkLogin)
    return {message:'Sucess'};
  }

  async _signNewAccessAndRefreshToken(checkLogin : UserOutputDto) {
    
  }

  async _checkExistence(id:string, pw:string){
    const loginUser : User|undefined = await this.userRepo.findOneBy({id:id})
    console.log(loginUser)
    if(loginUser===undefined||loginUser===null)return 'wrong Id'
    if(pw!==loginUser.pw)return 'wrong Pw'
    return loginUser;
  }


  async signUp(userInput:SignUpInputDto){
    const {id,pw,email,nickname,name,age}=userInput;
    
    try{
      // console.log(await this.userRepo.findUserById(id))
      const isDuplicate = await this._checkDuplicateId(id);
      if(isDuplicate){
        return {message:"duplicate id"}
      }
    }catch(err){
      console.log(err);
      throw new Error("FIND_USER_BY_ID_ERROR")
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
      await this.userRepo.save(signUpUser);
    }catch(err){
      console.log(err);
      throw new Error("SAVE_USER_ERROR")
    }
    return {message:"success"}
  }

  
  async _checkDuplicateId(id:string):Promise<Boolean> {
    let isDuplicate:boolean;
    const userData = await this.userRepo.findOneBy({id})
    !userData?isDuplicate=false:isDuplicate=true
    return isDuplicate
  }
}

