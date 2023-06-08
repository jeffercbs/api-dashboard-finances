import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsResolver } from './sessions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
   imports: [TypeOrmModule.forFeature([Session]), UsersModule],
   providers: [SessionsResolver, SessionsService],
   exports: [SessionsService],
})
export class SessionsModule {}
