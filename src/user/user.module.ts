import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

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


// secret: process.env.JWT_KEY,
// signOptions: { expiresIn: process.env.TOKEN_TIME },
// global: true