import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @ApiOperation({ summary: 'Endpoint untuk create user' })
  @ApiCreatedResponse({
    description: "Response success create user",
    type: CreateUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiQuery({
    type: Number,
    name: "limit",
    required: false
  })
  @ApiQuery({
    type: Number,
    name: "page",
    required: false
  })
  @ApiOperation({ summary: 'Endpoint untuk fetch user' })
  @ApiOkResponse({
    description: "Response success fetch user",
  })
  @ApiNotFoundResponse({
    description: "Not Found",
  })
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.userService.findAll(page, limit);
  }

}
