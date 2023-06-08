import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Register } from './entities/register.entity';
import { RegistersController } from './registers.controller';
import { RegistersResolver } from './registers.resolver';
import { RegistersService } from './registers.service';

@Module({
   imports: [TypeOrmModule.forFeature([Register]), UsersModule],
   providers: [RegistersService, RegistersResolver],
   controllers: [RegistersController],
})
export class RegistersModule {}
