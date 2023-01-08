import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "cjswp7014@@",
    database: "test1",
    // logging : true,
    autoLoadEntities: true,
    synchronize: true,
    entities: ["dist/**/*.entity.{ts,js}"]
  }),
  NoteModule  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
