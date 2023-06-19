import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionsService {
   constructor(
      @InjectRepository(Session)
      private sessionsRepository: Repository<Session>,
      private userService: UsersService,
   ) {}
   createSession(session: CreateSessionInput) {
      return this.sessionsRepository.save(session);
   }

   findAll(id: string) {
      return this.sessionsRepository.find({
         where: { user_id: id },
      });
   }

   async findOne(email: string) {
      const user = await this.userService.findUser(email);

      if (user) {
         throw new NotFoundException('User not found');
      }

      return this.sessionsRepository.find({
         where: {
            user: {
               id: user.id,
            },
         },
      });
   }

   update(id: string) {
      return `This action updates a #${id} session`;
   }

   remove(id: string) {
      return `This action removes a #${id} session`;
   }
}
