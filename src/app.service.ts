import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
   getHello(): string[] {
      return [
         'http://localhost:3000/auth',
         'http://localhost:3000/users',
         'http://localhost:3000/sessions',
         'http://localhost:3000/boards',
         'http://localhost:3000/registers',
      ];
   }
}
