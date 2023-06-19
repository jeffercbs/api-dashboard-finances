import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
   constructor(private readonly boardsService: BoardsService) {}

   @Get(':id')
   findBoard(@Param('id') id: string) {
      return this.boardsService.findOne(id);
   }

   @Post()
   createBoard(@Body() createBoardDto: CreateBoardDto) {
      return this.boardsService.create(createBoardDto);
   }

   @Patch(':id')
   updateBoard(
      @Param('id') id: string,
      @Body() updateBoardDto: UpdateBoardDto,
   ) {
      return this.boardsService.update(id, updateBoardDto);
   }

   @Delete(':id')
   deleteBoard(@Param('id') id: string) {
      return this.boardsService.remove(id);
   }
}
