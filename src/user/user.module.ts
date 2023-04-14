import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: userSchema },
        ]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('JWT_KEY'),
                signOptions: { expiresIn: config.get('TOKEN_TIME')}
            })
        })
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository]
})
export class UserModule {}
