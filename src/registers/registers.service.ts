import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Between, Repository } from 'typeorm';
import { CreateRegisterInput } from './dto/create-register-dto';
import { Register } from './entities/register.entity';

@Injectable()
export class RegistersService {
   constructor(
      @InjectRepository(Register)
      private registersRepository: Repository<Register>,
      private usersService: UsersService,
   ) {}

   async create(register: CreateRegisterInput) {
      const userFound = this.usersService.findUser(register.user_id);

      if (!userFound) {
         return new HttpException('User not found', 404);
      }

      const newRegister = this.registersRepository.create(register);
      return this.registersRepository.save(newRegister);
   }

   findAll() {
      return this.registersRepository.find();
   }

   findOne(id: string) {
      return this.registersRepository.findOne({
         where: {
            id,
         },
      });
   }

   findAllByMonthYear(month: number, year: number) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      return this.registersRepository.find({
         where: {
            created_at: Between(startDate, endDate),
         },
      });
   }

   async delete(id: string) {
      const register = await this.registersRepository.findOne({
         where: { id },
      });

      if (!register) {
         return new HttpException('Register not found', 404);
      }

      return await this.registersRepository.delete(id);
   }

   update(id: string, register: CreateRegisterInput) {
      return this.registersRepository.update(id, register);
   }
}
