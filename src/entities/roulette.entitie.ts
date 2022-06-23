import { IsOptional } from 'class-validator';
import { betListInterface } from 'src/interface/bet.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './users.entitie';

@Entity('Roulette')
export class RouletteEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserEntity, (user) => user.id, { eager: true })
  user: number | UserEntity;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  @IsOptional()
  bet: betListInterface[];
  @Column({
    type: 'datetime',
  })
  @IsOptional()
  date: Date;
  @IsOptional()
  @Column({
    type: 'float',
    length: 99999999,
    default: 0,
  })
  wonMoney: number;
  @Column({
    type: 'boolean',
    default: false,
  })
  @Column({
    type: 'varchar',
    length: 20,
  })
  gameMode: string;
  active: boolean;
}
