import {
   ConflictException,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginAuthInput } from './dto/login-auth.input';
import { RegisterAuthInput } from './dto/register-auth.input';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class AuthService {
   constructor(
      private jwtService: JwtService,
      private userService: UsersService,
      private sessionsService: SessionsService,
   ) {}

   async signUp(user: RegisterAuthInput) {
      const { password, email, name } = user;
      const hashpwd = await hash(password, 10);
      const userFound = await this.userService.findUser(email);

      if (userFound) throw new ConflictException('Email already exists');

      return this.userService.createUser({
         name,
         email,
         password: hashpwd,
      });
   }

   async signIn(user: LoginAuthInput) {
      const { email, password } = user;
      const userFound = await this.userService.findUser(email);

      if (!userFound) {
         throw new UnauthorizedException('Invalid email');
      }

      const checkpwd = await compare(password, userFound.password);
      if (!checkpwd) {
         throw new UnauthorizedException('Invalid password');
      }

      return {
         accces_token: await this.jwtService.signAsync({
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
         }),
      };
   }
}
