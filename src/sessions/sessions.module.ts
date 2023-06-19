import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Session } from './entities/session.entity';
import { SessionsService } from './sessions.service';

@Module({
   imports: [TypeOrmModule.forFeature([Session]), UsersModule],
   providers: [SessionsService],
   exports: [SessionsService],
})
export class SessionsModule {}
