import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('boards')
export class Board {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   user_id: string;

   @ManyToMany(() => User, (user) => user.boards)
   user: User;

   @Column()
   title: string;

   @Column()
   description: string;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   created_at: Date;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   updated_at: Date;
}
