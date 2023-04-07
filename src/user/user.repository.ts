import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>
    ) {}
    
    async createUser(createUserDto: CreateUserDTO): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
    
    async findUserByPhone(phone: string): Promise<User> {
        return await this.userModel.findOne({ phone });
    }
}
