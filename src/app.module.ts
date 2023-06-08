import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistersModule } from './registers/registers.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
   imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
         driver: ApolloDriver,
         autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
      TypeOrmModule.forRoot({
         type: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'postgres',
         password: '.......',
         database: 'finances',
         entities: [__dirname + '/**/*.entity{.ts,.js}'],
         synchronize: true,
      }),
      ThrottlerModule.forRoot({
         ttl: 100,
         limit: 10,
      }),
      RegistersModule,
      UsersModule,
      SessionsModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {
   constructor(private dataSource: DataSource) {}
}
