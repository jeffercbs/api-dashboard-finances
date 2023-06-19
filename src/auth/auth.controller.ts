import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Post,
   Request,
   UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginAuthInput } from './dto/login-auth.input';
import { RegisterAuthInput } from './dto/register-auth.input';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private usersService: UsersService,
   ) {}

   @Post('signup')
   async signUp(@Body() user: RegisterAuthInput) {
      return this.authService.signUp(user);
   }

   @Throttle(6, 2400)
   @HttpCode(HttpStatus.OK)
   @Post('signin')
   async signIn(@Body() user: LoginAuthInput) {
      return this.authService.signIn(user);
   }

   @UseGuards(JwtAuthGuard)
   @Get('user')
   async getUser(@Request() req) {
      return await this.usersService.findUser(req.user.email);
   }
}
