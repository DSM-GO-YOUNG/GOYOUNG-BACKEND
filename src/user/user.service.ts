import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    
    public async signUp(createUserDto: CreateUserDTO): Promise<User> {
        const user = await this.userRepository.findUserByPhone(createUserDto.phone);
        
        if(user) throw new ConflictException();
        
        return await this.userRepository.createUser(createUserDto);
    }
}
