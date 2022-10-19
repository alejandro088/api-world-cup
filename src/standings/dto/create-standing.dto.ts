import { Round } from './../../rounds/entities/round.entity';
import { Team } from './../../teams/entities/team.entity';
import { Group } from './../../groups/entities/group.entity';
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateStandingDto {
    @IsNumber()
    teamId: number;

    @IsNumber()
    groupId: number;

    @IsNumber()
    roundId: number;

    rank: number;

    points: number;

    matches_played: number;

    goal_diff: number;

    goals_scored: number;

    goals_conceded: number;

    won: number;

    drawn: number;

    lost: number;

}
