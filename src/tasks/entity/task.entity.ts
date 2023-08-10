import { UserEntity } from 'src/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid',{ name: 'task_id'})
  id: string;

  @Column({ name: 'task_name', nullable: false })
  taskName: string;

  @Column({ nullable: false })
  description: string;

  user: UserEntity;
  @Column()
  userId: string;
}
