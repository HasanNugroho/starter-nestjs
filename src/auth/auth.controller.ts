import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { Public } from './auth.decorator';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @ApiOperation({ summary: 'Endpoint untuk login' })
    @ApiOkResponse({
        description: "Response success login",
    })
    @ApiUnauthorizedResponse({
        description: "Bad request",
    })
    @Post('login')
    login(@Body() loginDto: loginDto) {
        return this.authService.login(loginDto);
    }
}
