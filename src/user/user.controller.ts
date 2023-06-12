import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginUserDTO, UserResDTO } from './dto/user.dto';
import { ObjectId } from 'mongoose';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('/')
    async signUp(
        @Body() createUserDto: CreateUserDTO
    ) {
        await this.userService.signUp(createUserDto);
        return { statusCode: 201, message: 'Success Sign up' };
    }

    @Get('/:id')
    async findUserById(
        @Param('id') id: ObjectId
    ) {
        return await this.userService.findUserById(id);
    }
}
