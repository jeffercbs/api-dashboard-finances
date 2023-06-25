import { HttpException, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
   constructor(
      @InjectRepository(Board)
      private BoardsRepository: Repository<Board>,
      private usersService: UsersService,
   ) {}

   async create(board: CreateBoardDto) {
      const userFound = this.usersService.findUser(board.user_id);

      if (!userFound) {
         return new HttpException('User not found', 404);
      }

      const newboard = this.BoardsRepository.create(board);
      return this.BoardsRepository.save(newboard);
   }

   findOne(id: string) {
      return this.BoardsRepository.findOne({
         where: {
            id,
         },
         relations: {
            registers: true,
            user: true,
         },
      });
   }

   async delete(id: string) {
      const board = await this.BoardsRepository.findOne({
         where: { id },
      });

      if (!board) {
         return new HttpException('Board not found', 404);
      }

      return await this.BoardsRepository.delete(id);
   }

   update(id: string, board: UpdateBoardDto) {
      return this.BoardsRepository.update(id, board);
   }
}
