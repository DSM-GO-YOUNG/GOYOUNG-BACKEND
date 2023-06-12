import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { CreateUserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { generateHash } from 'src/shared/hash';
import { ObjectId } from 'mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}
    
    public async signUp(createUserDto: CreateUserDTO): Promise<User> {
        const user = await this.userRepository.findUserByPhone(createUserDto.phone);
        
        if(user) throw new ConflictException('Phone number already exists');
        
        const hashedPassword = generateHash(createUserDto.password);
        const newCreateUserDto = { ...createUserDto, password: hashedPassword };

        return await this.userRepository.createUser(newCreateUserDto);
    }

    public async findUserById(id: ObjectId): Promise<User> {
        const user =  await this.userRepository.findUserById(id);

        if(!user) throw new NotFoundException('Not Found user');

        return user;
    }
}
