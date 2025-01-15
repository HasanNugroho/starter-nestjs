import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserDao {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    // function for create user
    async create(payload: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(payload);
        return this.usersRepository.save(user);
    }

    // function for find user
    async findOne(params: object): Promise<User> {
        return this.usersRepository.findOne({
            where: params
        });
    }

    // function for find users and count
    async findAll(limit: number, page: number): Promise<[User[], number]> {
        const offset = (page - 1) * limit;
        return await this.usersRepository.findAndCount({
            take: limit,
            skip: offset
        })
    }
}