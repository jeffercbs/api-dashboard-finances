import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RegistersModule } from './registers/registers.module';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';

@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'postgres',
         password: 'hack4u',
         database: 'finances',
         entities: [__dirname + '/**/*.entity{.ts,.js}'],
         synchronize: true,
      }),
      ThrottlerModule.forRoot({
         limit: 100,
         ttl: 3600,
      }),
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      RegistersModule,
      UsersModule,
      SessionsModule,
      AuthModule,
      BoardsModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {
   constructor(private dataSource: DataSource) {}
}
