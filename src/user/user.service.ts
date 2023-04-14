import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDTO, LoginUserDTO, UserResDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { comparePassword, generateHash } from 'src/shared/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}
    
    public async signUp(createUserDto: CreateUserDTO): Promise<User> {
        const user = await this.userRepository.findUserByPhone(createUserDto.phone);
        
        if(user) throw new ConflictException();
        
        const hashedPassword = generateHash(createUserDto.password);
        const newCreateUserDto = { ...createUserDto, password: hashedPassword };

        return await this.userRepository.createUser(newCreateUserDto);
    }

    public async login(loginUserDto: LoginUserDTO): Promise<UserResDTO> {
        const user = await this.userRepository.findUserByPhone(loginUserDto.phone);

        if(!user) throw new NotFoundException('존재하지 않는 전화번호');

        const isValid = comparePassword(user.password, loginUserDto.password);
        if(!isValid) {
            throw new UnauthorizedException();
        }

        const token = this.jwtService.sign({ id: user._id });
        
        return { access_token: token, _id: user._id };
    }
}
