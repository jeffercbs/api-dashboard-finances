import {
   ConflictException,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
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

   async createUser(user: CreateUserInput) {
      const userFound = this.findUser(user.email);
      if (!userFound) throw new ConflictException('Email already exists');

      const newUser = this.usersRepository.create(user);
      return this.usersRepository.save(newUser);
   }

   findUser(email: string) {
      const user = this.usersRepository.findOne({
         where: { email },
         cache: true,
      });

      if (!user) throw new NotFoundException('User not found');
      return user;
   }

   async updateUser(id: string, updateUserInput: UpdateUserInput) {
      const user = await this.usersRepository.findOne({
         where: {
            id,
         },
      });

      if (!user) throw new NotFoundException('User not found');

      const updatedUser = this.usersRepository.merge(user, updateUserInput);
      return this.usersRepository.save(updatedUser);
   }

   removeUser(id: string) {
      const user = this.usersRepository.findOne({
         where: {
            id,
         },
      });

      if (!user) throw new NotFoundException('User not found');

      return this.usersRepository.delete({
         id,
      });
   }
}
