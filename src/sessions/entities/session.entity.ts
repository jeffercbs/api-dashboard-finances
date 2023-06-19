import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessions')
export class Session {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   user_id: string;

   @ManyToMany(() => User, (User) => User.sessions)
   user: User;

   @Column()
   ip: string;

   @Column()
   user_agent: string;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   created_at: Date;

   @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
   end_at: Date;
}
