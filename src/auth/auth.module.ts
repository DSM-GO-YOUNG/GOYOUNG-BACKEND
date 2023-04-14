import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/user/schema/user.schema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: User.name, schema: userSchema }
    ]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn : process.env.TOKEN_TIME }, 
    }),
  ],
  providers: [AuthService, JwtStrategy, UserRepository],
  controllers: [AuthController]
})
export class AuthModule {}