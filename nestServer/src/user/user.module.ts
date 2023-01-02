import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repositoy';

@Module({
  controllers: [UserController],
  providers: [UserService,UserRepository],
  
})
export class UserModule {}
