import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { LoginAuthInput } from './dto/login-auth.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
   constructor(private usersService: UsersService) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: 'dmldmskdskdsmkdsmdksmfkfs',
      });
   }

   async validate(payload: LoginAuthInput) {
      const user = await this.usersService.findUser(payload.email);

      if (!user) throw new UnauthorizedException('User not found');
      return user;
   }
}
