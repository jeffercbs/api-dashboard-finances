import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('registers')
export class Register {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   user_id: string;

   @OneToOne(() => User, (user) => user.registers)
   user: User;

   @OneToOne(() => Board, (board) => board.registers, { nullable: true })
   board: Board;

   @Column()
   title: string;

   @Column()
   description: string;

   @Column()
   category: string;

   @Column()
   type: string;

   @Column()
   amount: number;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   created_at: Date;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   updated_at: Date;
}
