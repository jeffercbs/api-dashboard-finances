import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
   imports: [TypeOrmModule.forFeature([Board]), UsersModule],
   controllers: [BoardsController],
   providers: [BoardsService],
   exports: [BoardsService],
})
export class BoardsModule {}
