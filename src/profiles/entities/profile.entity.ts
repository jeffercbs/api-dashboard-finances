import { PrimaryGeneratedColumn } from 'typeorm';

export class Profile {
   @PrimaryGeneratedColumn('uuid')
   id: string;
}
