import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRegisterInput } from './dto/create-register-dto';
import { Register } from './entities/register.entity';
import { RegistersService } from './registers.service';

@Resolver()
export class RegistersResolver {
   constructor(private registersService: RegistersService) {}

   @Mutation(() => Register)
   createRegister(@Args('register') register: CreateRegisterInput) {
      return this.registersService.create(register);
   }

   @Query(() => [Register])
   findAll() {
      return this.registersService.findAll();
   }

   @Query(() => Register)
   findOne(@Args('id') id: string) {
      return this.registersService.findOne(id);
   }

   @Query(() => [Register])
   findAllByMonthYear(
      @Args('month') month: number,
      @Args('year') year: number,
   ) {
      return this.registersService.findAllByMonthYear(month, year);
   }

   @Mutation(() => Register)
   updateRegister(
      @Args('id') id: string,
      @Args('register') register: CreateRegisterInput,
   ) {
      return this.registersService.update(id, register);
   }
}
