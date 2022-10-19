import { Standing } from './../../standings/entities/standing.entity';
import { Match } from './../../matches/entities/match.entity';

import { Entity, Column, Unique, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
@Unique(["name"])
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Match, (match) => match.team1)
  @OneToMany((type) => Match, (match) => match.team2)
  matches: Match[]


  @OneToMany((type) => Standing, (standing) => standing.teamId)
  standings: Standing[]

}