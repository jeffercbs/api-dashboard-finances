import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
   getHello(): string[] {
      return [
         'http://localhost:3000/graphql',
         'http://localhost:3000/registers',
         'http://localhost:3000/users',
      ];
   }
}
