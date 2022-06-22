import { Role } from 'src/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Unique(['email'])
  id: number;
  @Column('varchar', {
    length: 100,
  })
  fullName: string;
  @Column('varchar', {
    length: 100,
  })
  email: string;
  @Column('varchar', {
    length: 250,
  })
  password: string;
  @Column('int')
  phone: number;
  @Column('float')
  balance: number;
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
  @Column({
    type: 'boolean',
    default: false,
  })
  active: boolean;
}
