import { Round } from './../../rounds/entities/round.entity';
import { Group } from './../../groups/entities/group.entity';
import { Team } from './../../teams/entities/team.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Timestamp, Unique } from "typeorm";


@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' }) // Recommended
  play_at: Date;

  @ManyToOne((type) => Team, (team) => team.matches)
  team1: Team

  @RelationId((match: Match) => match.team1)
  team1Id: number;

  @ManyToOne((type) => Team, (team) => team.matches)
  team2: Team

  @RelationId((match: Match) => match.team2)
  team2Id: number;

  @Column()
  resultTeam1: number;

  @Column()
  resultTeam2: number;

  @RelationId((match: Match) => match.group)
  groupId: number;

  @ManyToOne((type) => Group, (group) => group.matches)
  group: Group

  @RelationId((match: Match) => match.round)
  roundId: number;

  @ManyToOne((type) => Round, (round) => round.matches)
  round: Round

}