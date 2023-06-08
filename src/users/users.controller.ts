import {
   Body,
   Controller,
   Get,
   Param,
   ParseUUIDPipe,
   Post,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private usersService: UsersService) {}
   @Get()
   async getUsers(): Promise<User[]> {
      return this.usersService.findAll();
   }

   @Get(':id')
   async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
      return this.usersService.findOne(id);
   }

   @Post()
   async createUser(@Body() user: CreateUserInput): Promise<User | any> {
      return this.usersService.create(user);
   }
}

