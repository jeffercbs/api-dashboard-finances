import { Exclude } from 'class-transformer';
import { MinLength } from 'class-validator';
import { Board } from 'src/boards/entities/board.entity';
import { Register } from 'src/registers/entities/register.entity';
import { Session } from 'src/sessions/entities/session.entity';
import {
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
   Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   @MinLength(8)
   @Exclude()
   password: string;

   @OneToMany(() => Register, (register) => register.user)
   registers: Register[];

   @OneToMany(() => Board, (board) => board.user)
   boards: Board[];

   @OneToMany(() => Session, (session) => session.user)
   sessions: Session[];

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   created_at: Date;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   updated_at: Date;
}
