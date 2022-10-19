import { Round } from './../../rounds/entities/round.entity';
import { Group } from './../../groups/entities/group.entity';
import { Team } from './../../teams/entities/team.entity';


import { Entity, Column, Unique, PrimaryGeneratedColumn, OneToMany, RelationId, ManyToOne } from 'typeorm';

@Entity()
@Unique(["teamId", "groupId", "roundId"])
export class Standing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamId: number

  // @ManyToOne((type) => Team, (team) => team.standings)
  // team: Team

  @Column()
  rank: number;
  
  @Column()
  points: number;

  @Column()
  matches_played: number;
  
  @Column()
  goal_diff: number;

  @Column()
  goals_scored: number;

  @Column()
  goals_conceded: number;

  @Column()
  lost: number;

  @Column()
  drawn: number;

  @Column()
  won: number;

  @Column()
  groupId: number;

  // @ManyToOne((type) => Group, (group) => group.standings)
  // group: Group
  
  @Column()
  roundId: number;

  
  // @ManyToOne((type) => Round, (round) => round.standings)
  // round: Round
}