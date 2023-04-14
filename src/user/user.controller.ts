import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, LoginUserDTO, UserResDTO } from './dto/user.dto';

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

    @Post('/login')
    async login(
        @Body() loginUserDto: LoginUserDTO
    ): Promise<UserResDTO> {
        return this.userService.login(loginUserDto);
    }
}
