import { Standing } from './../../standings/entities/standing.entity';
import { Match } from './../../matches/entities/match.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["name"])
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Match, (match) => match.group)
  matches: Match[]

  @OneToMany((type) => Standing, (standing) => standing.groupId)
  standings: Standing[]
}