import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
   imports: [
      UsersModule,
      SessionsModule,
      JwtModule.register({
         global: true,
         secret: 'dmldmskdskdsmkdsmdksmfkfs',
         signOptions: { expiresIn: '24h' },
      }),
   ],
   providers: [AuthService, AuthStrategy],
   controllers: [AuthController],
})
export class AuthModule {}
