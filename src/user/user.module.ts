import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/shared/multerOptions';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: userSchema },
        ]),
        MulterModule.registerAsync({
            useFactory: multerOptionsFactory
        })
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository]
})
export class UserModule {}