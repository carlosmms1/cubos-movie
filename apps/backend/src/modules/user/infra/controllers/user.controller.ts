import { Body, Controller, Post, Get, Query } from '@nestjs/common';

import { UserService } from '../../app/services/user.service';
import { CreateUserDTO } from '../../app/dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.userService.createUser(data);
  }

  @Get('confirm')
  async confirmEmail(@Query('token') token: string) {
    return await this.userService.confirmEmail(token);
  }
}
