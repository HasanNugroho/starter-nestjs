import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider } from './entities/user.provider';
import { UserDaoProvider } from './dao/user.provider';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from './dao/user.dao';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserProvider, UserDaoProvider],
  exports: [UserDao]
})
export class UserModule { }
