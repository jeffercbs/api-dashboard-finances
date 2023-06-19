import {
   Body,
   Controller,
   Delete,
   Get,
   NotFoundException,
   Param,
   ParseIntPipe,
   ParseUUIDPipe,
   Patch,
   Post,
   Query,
   UseGuards,
} from '@nestjs/common';
import { CreateRegisterInput } from './dto/create-register-dto';
import { Register } from './entities/register.entity';
import { RegistersService } from './registers.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('registers')
@UseGuards(JwtAuthGuard)
export class RegistersController {
   constructor(private registerService: RegistersService) {}
   @Get()
   async getRegisters(): Promise<Register[]> {
      return this.registerService.findAll();
   }

   @Get()
   async getRegistersByMonthYear(
      @Query('month', ParseIntPipe) month: number,
      @Query('year', ParseIntPipe) year: number,
   ): Promise<Register[]> {
      const registers = await this.registerService.findAllByMonthYear(
         month,
         year,
      );
      if (!registers || registers.length === 0) {
         throw new NotFoundException('Registers not found');
      }
      return registers;
   }

   @Get(':id')
   async getRegister(
      @Param('id', ParseUUIDPipe) id: string,
   ): Promise<Register> {
      const register = this.registerService.findOne(id);

      if (!register) throw new NotFoundException('Register not found');
      return register;
   }

   @Post()
   createRegister(
      @Body() register: CreateRegisterInput,
   ): Promise<Register | any> {
      return this.registerService.create(register);
   }

   @Delete(':id')
   deleteRegister(@Param('id', ParseUUIDPipe) id: string) {
      return this.registerService.delete(id);
   }

   @Patch(':id')
   updateRegister(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() register: CreateRegisterInput,
   ) {
      return this.registerService.update(id, register);
   }
}
