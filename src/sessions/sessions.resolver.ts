import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { Session } from './entities/session.entity';

@Resolver('Session')
export class SessionsResolver {
   constructor(private readonly sessionsService: SessionsService) {}

   @Mutation(() => Session)
   create(@Args('createSessionInput') createSessionInput: CreateSessionInput) {
      return this.sessionsService.create(createSessionInput);
   }

   @Query(() => [Session], { name: 'sessions' })
   findAll() {
      return this.sessionsService.findAll();
   }

   @Query(() => Session, { name: 'session' })
   findOne(@Args('id') id: string) {
      return this.sessionsService.findOne(id);
   }

   @Mutation(() => Session)
   update(@Args('updateSessionInput') updateSessionInput: UpdateSessionInput) {
      return this.sessionsService.update(
         updateSessionInput.id,
         updateSessionInput,
      );
   }

   @Mutation(() => Session)
   remove(@Args('id') id: string) {
      return this.sessionsService.remove(id);
   }
}

