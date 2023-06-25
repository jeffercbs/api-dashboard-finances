import { Register } from 'src/registers/entities/register.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('boards')
export class Board {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   user_id: string;

   @OneToOne(() => User, (user) => user.boards)
   user: User;

   @OneToOne(() => Register, (register) => register.board)
   registers: Register[];

   @Column()
   title: string;

   @Column()
   description: string;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   created_at: Date;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   updated_at: Date;
}
