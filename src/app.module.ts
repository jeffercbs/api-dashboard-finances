import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { dbconfig } from './config';
import { RegistersModule } from './registers/registers.module';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
   imports: [
      TypeOrmModule.forRoot({
         ...dbconfig,
         type: 'postgres',
         entities: [__dirname + '/**/*.entity{.ts,.js}'],
         synchronize: true,
      }),
      ThrottlerModule.forRoot({
         limit: 100,
         ttl: 3600,
      }),
      RegistersModule,
      UsersModule,
      SessionsModule,
      AuthModule,
      BoardsModule,
      ProfilesModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {
   constructor(private dataSource: DataSource) {}
}
