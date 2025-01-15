import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDao } from './dao/user.dao';
import * as bcrypt from 'bcrypt';
import { generatePagination, ListResponse } from 'src/common/utils';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserDao) private userDao: UserDao,
  ) { }

  // service for create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email } = createUserDto

      // checking user exist and throw error if exist
      const userExist = await this.userDao.findOne({ email });
      if (userExist) throw new BadRequestException('Email already exists');

      const saltOrRounds = 10;
      createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);

      return await this.userDao.create(createUserDto);
    } catch (e) {
      throw e
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<ListResponse> {
    try {
      const [users, count] = await this.userDao.findAll(limit, page);

      if (users.length == 0) {
        throw new NotFoundException("Data not found")
      }

      const result: ListResponse = {
        message: 'Data fetched successfully',
        pagination: generatePagination(count, page, limit),
        data: users
      }
      return result;
    } catch (e) {
      throw e
    }
  }

}
