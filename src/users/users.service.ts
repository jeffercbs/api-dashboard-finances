import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
   ) {}

   async create(user: CreateUserInput) {
      const newUser = this.usersRepository.create(user);
      const userFound = await this.usersRepository.findOne({
         where: {
            email: user.email,
         },
      });

      if (userFound) {
         return new ConflictException('Email already exists');
      }

      return this.usersRepository.save(newUser);
   }

   findAll() {
      return this.usersRepository.find();
   }

   findOne(id: string) {
      return this.usersRepository.findOne({
         where: {
            id,
         },
      });
   }

   update(id: string, updateUserInput: UpdateUserInput) {
      return `This action updates a #${id} user`;
   }

   remove(id: string) {
      return `This action removes a #${id} user`;
   }
}
