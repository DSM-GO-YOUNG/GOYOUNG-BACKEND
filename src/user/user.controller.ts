import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginUserDTO, UserResDTO } from './dto/user.dto';
import { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('/')
    @UseInterceptors(FileInterceptor('image'))
    async signUp(
        @Body() createUserDto: CreateUserDTO,
        @UploadedFile() image: Express.Multer.File
    ) {
        await this.userService.signUp(createUserDto, image.originalname);
        return { statusCode: 201, message: 'Success Sign up' };
    }

    @Get('/:id')
    async findUserById(
        @Param('id') id: ObjectId
    ) {
        return await this.userService.findUserById(id);
    }
}
