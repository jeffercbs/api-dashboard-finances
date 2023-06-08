import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
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
   create(session: CreateSessionInput) {
      return this.sessionsRepository.save(session);
   }

   async findAll(id: string) {
      const user = await this.userService.findOne(id);

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

   findOne(id: string) {
      return `This action returns a #${id} session`;
   }

   update(id: string, updateSessionInput: UpdateSessionInput) {
      return `This action updates a #${id} session`;
   }

   remove(id: string) {
      return `This action removes a #${id} session`;
   }
}
