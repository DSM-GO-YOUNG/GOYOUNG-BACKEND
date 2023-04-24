import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: userSchema },
        ])
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository]
})
export class UserModule {}