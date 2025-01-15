import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDao } from 'src/user/dao/user.dao';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserDao) private userDao: UserDao,
        private jwtService: JwtService
    ) { }

    async login(loginDto: loginDto) {
        try {
            const { email } = loginDto
            const user = await this.userDao.findOne({ email })

            if (!user) { throw new UnauthorizedException('Username/password salah'); }

            const isMatch = await bcrypt.compare(loginDto.password, user.password);

            if (!isMatch) { throw new UnauthorizedException('Username/password salah'); }

            const payload = { userId: user.id, email: user.email, name: user.name };
            return {
                access_token: await this.jwtService.signAsync(payload),
                user: payload
            }
        } catch (e) {
            throw e
        }
    }
}
