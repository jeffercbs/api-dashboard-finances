import { Exclude } from 'class-transformer';
import { MinLength } from 'class-validator';
import { Board } from 'src/boards/entities/board.entity';
import { Register } from 'src/registers/entities/register.entity';
import { Session } from 'src/sessions/entities/session.entity';
import {
   Column,
   Entity,
   JoinColumn,
   OneToOne,
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

   @OneToOne(() => Register)
   @JoinColumn({ name: 'registers_id' })
   registers: Register[];

   @OneToOne(() => Board)
   @JoinColumn({ name: 'boards_id' })
   boards: Board[];

   @OneToOne(() => Session)
   @JoinColumn({ name: 'sessions_id' })
   sessions: Session[];

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   created_at: Date;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   updated_at: Date;
}
