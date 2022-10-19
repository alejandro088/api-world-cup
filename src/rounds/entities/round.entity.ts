import { Standing } from './../../standings/entities/standing.entity';
import { Match } from './../../matches/entities/match.entity';


import { Entity, Column, Unique, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
@Unique(["title"])
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'timestamp' })
  start_at: Date;

  @Column({ type: 'timestamp' })
  end_at: Date;

  @OneToMany((type) => Match, (match) => match.round)
  matches: Match[]

  @OneToMany((type) => Standing, (standing) => standing.roundId)
  standings: Standing[]
}