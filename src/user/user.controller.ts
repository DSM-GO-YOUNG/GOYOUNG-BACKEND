import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    async signUp(
        @Body() createUserDto: CreateUserDTO
    ) {
        return await this.userService.signUp(createUserDto);
    }
}
